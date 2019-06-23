'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:ViewAddEditCtrl
 * @description
 * # ViewAddEditCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('ViewAddEditCtrl', ['$scope','SweetAlert', 'viewsModel', '$location', '$routeParams',
    'breadcrumb', 'schemaHelper', 'projectsModel', 'dataHelper', 'mysql',
    '$route', 'session', 'ngProgressFactory',
  function ($scope, SweetAlert, viewsModel, $location, $routeParams,
      breadcrumb, schemaHelper, projectsModel, dataHelper, mysql,
      $route, session, ngProgressFactory) {
    $scope.editMode = ($route.current.$$route.controllerAs == "updateView");

    var viewId = $routeParams.id;
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.viewData = {};
    $scope.schemaBuilder = undefined;
    $scope.term = undefined;
    $scope.columns = [];
    $scope.userInput = {};
    $scope.dataHelper = undefined;
    $scope.boxTitle = "Create";

    function load() {
      viewsModel.getById(viewId).then(function(results) {
        angular.copy(results.rows[0], $scope.viewData);

        projectsModel.getById($scope.viewData.project_id).then(function(projectResults) {
          $scope.project = projectResults.rows[0];

          try {
            $scope.schemaBuilder = schemaHelper.loadBuilder($scope.viewData.schema);
            $scope.term = $scope.schemaBuilder.getTerm();
            $scope.columns = $scope.schemaBuilder.getColumns();
            if ($scope.editMode){
              $scope.boxTitle = "Update";
              breadcrumb.append("Update", "#/view/"+viewId+"/update");
              loadEditMode();
            } else {
              fillDefaultValues();
              breadcrumb.append("Create", "#/view/"+viewId+"/create");
            }
          } catch (er) {}
        });
      });
    }

    function loadEditMode() {
      $scope.progressbar.start();
      var primaryKey = $scope.schemaBuilder.getPrimaryKey();
      var obj = {};
      obj[primaryKey] = $routeParams.key;

      $scope.dataHelper = dataHelper.init(getConnection(), $scope.schemaBuilder);
      $scope.dataHelper.read.getRow(obj)
        .then(function(results){
          $scope.progressbar.complete();
          Object.keys(results[0]).forEach(function(key){
            $scope.userInput[key] = results[0][key];
          });
          $scope.$apply();
        })
        .catch(function(err){
          $scope.progressbar.complete();
          SweetAlert.swal("Error", err, "error");
        });
    }

    function fillDefaultValues() {
      $scope.columns.forEach(function(col){
        $scope.userInput[col.Field] = col.Default;
      });
    }

    function getConnection() {
      return session.getConnection();
    }

    $scope.onSaveBtn = function(){
      $scope.dataHelper = dataHelper.init(getConnection(), $scope.schemaBuilder);
      var saveMethod = $scope.editMode ? $scope.dataHelper.update.update : $scope.dataHelper.create.create;
      var saveMessage = $scope.editMode ? "updated" : "created";
      saveMethod($scope.userInput)
        .then(function(){
          SweetAlert.swal("Success", $scope.term.one + " "+saveMessage+".", "success");
          $location.path("/view/"+viewId);
        })
        .catch(function(err){
          SweetAlert.swal("Error", err, "error");
        });
    };

    load();


  }]);
