'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:SetupviewCtrl
 * @description
 * # SetupviewCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('SetupviewCtrl',
    ['$scope','session', 'viewsModel', '$location', '$routeParams', 'breadcrumb', 'mysql', 'SweetAlert','schemaHelper',
    function ($scope, session, viewsModel, $location, $routeParams, breadcrumb, mysql, SweetAlert, schemaHelper) {

      var viewId = $routeParams.id;
      $scope.project = session.getProject();
      $scope.viewData = {};
      $scope.tables = [];
      $scope.columns = [];
      $scope.selectedTable = undefined;
      $scope.table = undefined;
      $scope.schemaBuilder = undefined;
      $scope.term = {
        one: "",
        many: ""
      };
      $scope.permissions = {
        c: true,
        r: true,
        u: true,
        d: true
      };

      $scope.onTablesSelected = function(item) {
        $scope.table = item.name;
        $scope.schemaBuilder.setTableName($scope.table);
        $scope.term.one = $scope.table;
        $scope.term.many = $scope.table + "s";
        getMySQLColumns();
      };

      $scope.onSaveBtn = function() {
        $scope.schemaBuilder.setActiveColumns(getActiveColumns());
        $scope.schemaBuilder.setTerm($scope.term);
        $scope.schemaBuilder.setPermissions($scope.permissions);
        console.log($scope.schemaBuilder.toJSON());
        console.log($scope.schemaBuilder.toJSONString());
        viewsModel.update(viewId, {
          schema: $scope.schemaBuilder.toJSONString()
        });
      }

      function reload() {
        viewsModel.getById(viewId).then(function(results) {
          angular.copy(results.rows[0], $scope.viewData);
          console.log($scope.viewData);
          if ($scope.viewData.schema && schemaHelper.validateSchema(JSON.parse($scope.viewData.schema))) {
            $scope.schemaBuilder = schemaHelper.loadBuilder($scope.viewData.schema);
            $scope.table = $scope.schemaBuilder.getTableName();
            angular.copy($scope.schemaBuilder.getTerm(), $scope.term);
            angular.copy($scope.schemaBuilder.getPermissions(), $scope.permissions);
            $scope.selectedTable = { value: { name: $scope.table } };
            getMySQLColumns();
          } else {
            $scope.schemaBuilder = schemaHelper.newBuilder();
          }
          breadcrumb.append("Configure", "/#/view/"+$scope.viewId + "setup");
          getMySQLTables();
        });
      }

      function getActiveColumns() {
        return $scope.columns.filter(function(row){
          return row.selected == true;
        });
      }

      function setActiveColumns() {
        if ( ! $scope.schemaBuilder || ! $scope.schemaBuilder.getActiveColumns())
        {
          return;
        }
        var ac = $scope.schemaBuilder.getActiveColumns().map(function(row){
          return row.Field;
        });
        $scope.columns.forEach(function(col){
          col.selected = (ac.indexOf(col.Field) > -1);
        });
      }

      function getMySQLTables() {
        var connection = mysql.getConnection($scope.project.mysql_host,
          $scope.project.mysql_port,
          $scope.project.mysql_user,
          $scope.project.mysql_password,
          $scope.project.mysql_db);
          connection.connect();

        mysql.getTables(connection)
          .then(function(results) {
            results = results.map(function(a) {
              return {name: a[Object.keys(a)[0]]};
            });
            angular.copy(results, $scope.tables);
            //$scope.selectedTable = { value: $scope.tables[0] };
            $scope.$apply();
            mysql.closeConnection(connection);
          })
          .catch(function(err) {
            SweetAlert.swal("Error", err, "error");
            mysql.closeConnection(connection);
          });
      }

      function getMySQLColumns() {
        var connection = mysql.getConnection($scope.project.mysql_host,
          $scope.project.mysql_port,
          $scope.project.mysql_user,
          $scope.project.mysql_password,
          $scope.project.mysql_db);
          connection.connect();

        mysql.getTableDesc(connection, $scope.table)
          .then(function(results) {
            angular.copy(results, $scope.columns);
            $scope.$apply();

            // we can set the selected checkboxes only after list render
            //$scope.columns[0].selected = true;
            setActiveColumns();
            // run apply for immediate render of the selected checkboxes
            $scope.$apply();
            $scope.schemaBuilder.setColumns($scope.columns);
            mysql.closeConnection(connection);
          })
          .catch(function(err) {
            SweetAlert.swal("Error", err, "error");
            mysql.closeConnection(connection);
          });
      }

      reload();


  }]);
