'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:ViewAddEditCtrl
 * @description
 * # ViewAddEditCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('ViewAddEditCtrl', ['$scope','session', 'viewsModel', '$location', '$routeParams', 'breadcrumb', 'schemaHelper', 'projectsModel', 'dataHelper', 'mysql',
  function ($scope, session, viewsModel, $location, $routeParams, breadcrumb, schemaHelper, projectsModel, dataHelper, mysql) {

    var viewId = $routeParams.id;
    $scope.viewData = {};
    $scope.schemaBuilder = undefined;
    $scope.term = undefined;
    $scope.columns = [];
    $scope.userInput = {};

    function load() {
      viewsModel.getById(viewId).then(function(results) {
        angular.copy(results.rows[0], $scope.viewData);

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

    $scope.onSaveBtn = function(){
      console.log($scope.userInput);
    };

    load();


  }]);
