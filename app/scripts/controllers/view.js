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
    ['$scope','session', 'viewsModel', '$location', '$routeParams', 'breadcrumb', 'schemaHelper', 'projectsModel', 'dataHelper', 'mysql', 'SweetAlert',
    function ($scope, session, viewsModel, $location, $routeParams, breadcrumb, schemaHelper, projectsModel, dataHelper, mysql, SweetAlert) {

      var viewId = $routeParams.id;
      $scope.rowsPerPage = 10;
      $scope.currentPage = 1;
      $scope.viewData = {};
      $scope.isViewEmpty = true;
      $scope.schemaBuilder = undefined;
      $scope.project = undefined;
      $scope.dataHelper = undefined;
      $scope.term = undefined;
      $scope.permissions = {
      };
      $scope.tableData = {
        count: 0,
        columns: [],
        rows: []
      };
      $scope.sortingColumn;
      $scope.sortingDir = "ASC";

      $scope.pageChanged = function(page){
        loadTable();
      };

      function reload() {
        viewsModel.getById(viewId).then(function(results) {
          angular.copy(results.rows[0], $scope.viewData);

          projectsModel.getById($scope.viewData.project_id).then(function(projectResults) {
            $scope.project = projectResults.rows[0];
            loadTable();
          });

          try {
            $scope.schemaBuilder = schemaHelper.loadBuilder($scope.viewData.schema);
            $scope.sortingColumn = $scope.schemaBuilder.getActiveColumnsList()[0];
          } catch (er) {}
          $scope.isViewEmpty = isViewEmpty();
          breadcrumb.set($scope.viewData.name, "#/view/"+viewId);
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
        return session.getConnection();
      }

      function loadTable() {
        $scope.term = $scope.schemaBuilder.getTerm();
        $scope.permissions = $scope.schemaBuilder.getPermissions();
        $scope.dataHelper = dataHelper.init(getConnection(), $scope.schemaBuilder);
        $scope.dataHelper.read.getResults(($scope.currentPage-1)*$scope.rowsPerPage,
                                          $scope.rowsPerPage, $scope.sortingColumn,
                                          $scope.sortingDir)
          .then(function(results){
            $scope.tableData = results;
            $scope.$apply();
          });

      }

      $scope.updateRow = function(row) {
        var rowId = row[$scope.schemaBuilder.getPrimaryKey()];
        $location.path("/view/"+viewId+"/update/"+rowId)
      };

      $scope.doSorting = function(col) {
        $scope.sortingColumn = col;
        $scope.sortingDir = $scope.sortingDir == "ASC" ? "DESC" : "ASC";
        loadTable();
      };

      $scope.deleteRow = function(row) {
        var obj = {};
        obj[$scope.schemaBuilder.getPrimaryKey()] = row[$scope.schemaBuilder.getPrimaryKey()];
        console.log(obj);
        SweetAlert.swal({
          title: "Are you sure?",
          text: "Your will not be able to recover this "+$scope.term.one,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          closeOnConfirm: false,
          closeOnCancel: false },
          function(isConfirm){
             if (isConfirm) {
              $scope.dataHelper = dataHelper.init(getConnection(), $scope.schemaBuilder);
              $scope.dataHelper.delete.delete(obj)
                .then(function(){
                  SweetAlert.swal("Deleted!", "Your "+$scope.term.one+" file has been deleted.", "success");
                  loadTable();
                })
                .catch(function(err){
                  SweetAlert.swal("Error", err, "error");
                });
             }
          });
      };

      reload();

  }]);
