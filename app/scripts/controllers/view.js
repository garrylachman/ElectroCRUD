'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('ViewCtrl',
    ['$scope','session', 'viewsModel', '$location', '$routeParams', 'breadcrumb', 'schemaHelper', 'projectsModel', 'dataHelper', 'mysql',
    function ($scope, session, viewsModel, $location, $routeParams, breadcrumb, schemaHelper, projectsModel, dataHelper, mysql) {

      var viewId = $routeParams.id;
      $scope.rowsPerPage = 10;
      $scope.currentPage = 1;
      $scope.viewData = {};
      $scope.isViewEmpty = true;
      $scope.schemaBuilder = undefined;
      $scope.project = undefined;
      $scope.dataHelper = undefined;
      $scope.term = undefined;
      $scope.tableData = {
        count: 0,
        columns: [],
        rows: []
      };

      $scope.pageChanged = function(page){
        console.log("pageChanged");
      };

      function reload() {
        viewsModel.getById(viewId).then(function(results) {
          angular.copy(results.rows[0], $scope.viewData);

          projectsModel.getById($scope.viewData.project_id).then(function(projectResults) {
            $scope.project = projectResults.rows[0];
            initTable();
          });

          try {
            $scope.schemaBuilder = schemaHelper.loadBuilder($scope.viewData.schema);
          } catch (er) {}
          $scope.isViewEmpty = isViewEmpty();
          breadcrumb.set($scope.viewData.name, "/#/view/"+$scope.viewId);
        });
      }

      function isViewEmpty() {
        return ( ! $scope.viewData.schema ||
                   $scope.viewData.schema == "{}" ||
                 ! $scope.schemaBuilder.getTableName() ||
                 ! $scope.schemaBuilder.getColumns() ||
                 ! $scope.schemaBuilder.getActiveColumns());
      }

      function getConnection() {
        console.log($scope.project);
        var connection = mysql.getConnection($scope.project.mysql_host,
          $scope.project.mysql_port,
          $scope.project.mysql_user,
          $scope.project.mysql_password,
          $scope.project.mysql_db);
        connection.connect();
        return connection;
      }

      function initTable() {
        $scope.term = $scope.schemaBuilder.getTerm();
        $scope.dataHelper = dataHelper.init(getConnection(), $scope.schemaBuilder);
        $scope.dataHelper.read.getResults(0, 10).then(function(results){
          $scope.tableData = results;
          $scope.$apply();
          console.log(results);
        });

      }

      reload();

  }]);
