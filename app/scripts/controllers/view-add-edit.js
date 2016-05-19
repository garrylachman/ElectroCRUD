'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:ViewAddEditCtrl
 * @description
 * # ViewAddEditCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('ViewAddEditCtrl', ['$scope','SweetAlert', 'viewsModel', '$location', '$routeParams', 'breadcrumb', 'schemaHelper', 'projectsModel', 'dataHelper', 'mysql',
  function ($scope, SweetAlert, viewsModel, $location, $routeParams, breadcrumb, schemaHelper, projectsModel, dataHelper, mysql) {

    var viewId = $routeParams.id;
    $scope.viewData = {};
    $scope.schemaBuilder = undefined;
    $scope.term = undefined;
    $scope.columns = [];
    $scope.userInput = {};

    function load() {
      viewsModel.getById(viewId).then(function(results) {
        angular.copy(results.rows[0], $scope.viewData);

        projectsModel.getById($scope.viewData.project_id).then(function(projectResults) {
          $scope.project = projectResults.rows[0];
        });

        try {
          $scope.schemaBuilder = schemaHelper.loadBuilder($scope.viewData.schema);
          $scope.term = $scope.schemaBuilder.getTerm();
          $scope.columns = $scope.schemaBuilder.getColumns();
          fillDefaultValues();
        } catch (er) {}

        breadcrumb.append("Create", "#/view/"+viewId+"/create");
      });
    }

    function fillDefaultValues() {
      $scope.columns.forEach(function(col){
        $scope.userInput[col.Field] = col.Default;
      });
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

    $scope.onSaveBtn = function(){
      console.log($scope.userInput);

      mysql.insertData(getConnection(), $scope.schemaBuilder.getTableName(), $scope.userInput)
        .then(function(){
          SweetAlert.swal("Success", $scope.term.one + " created.", "success");
          $location.path("#view/"+viewId);
        })
        .catch(function(err){
          SweetAlert.swal("Error", err, "error");
        });
    };

    load();


  }]);
