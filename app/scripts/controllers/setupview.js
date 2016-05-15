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
    ['$scope','session', 'viewsModel', '$location', '$routeParams', 'breadcrumb', 'mysql', 'SweetAlert',
    function ($scope, session, viewsModel, $location, $routeParams, breadcrumb, mysql, SweetAlert) {

      var viewId = $routeParams.id;
      $scope.project = session.getProject();
      $scope.viewData = {};
      $scope.tables = [];
      $scope.columns = [];
      $scope.selectedTable = undefined;
      $scope.table = undefined;

      $scope.onTablesSelected = function(item) {
        $scope.table = item.name;
        getMySQLColumns();
      };

      function reload() {
        viewsModel.getById(viewId).then(function(results) {
          angular.copy(results.rows[0], $scope.viewData);
          breadcrumb.append("Configure", "/#/view/"+$scope.viewId + "setup");
          getMySQLTables();
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
            mysql.closeConnection(connection);
          })
          .catch(function(err) {
            SweetAlert.swal("Error", err, "error");
            mysql.closeConnection(connection);
          });
      }



      reload();


  }]);
