'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:AddeditprojectCtrl
 * @description
 * # AddeditprojectCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('AddeditprojectCtrl', ['$scope', 'breadcrumb', 'projectsModel', '$route', '$routeParams',
  function ($scope, breadcrumb, projectsModel, $route, $routeParams) {
    $scope.editMode = ($route.current.$$route.controllerAs == "editProject");
    $scope.project = {};
    $scope.detailsFormValid = false;

    $scope.$watchCollection('project', function(newNames, oldNames) {
      $scope.detailsFormValid = formValidator();
    });

    if ($scope.editMode) {
      var projectId = $routeParams.id;
      var data = projectsModel.getById(projectId).then(function(result){
        initEdit(result.rows[0])
      });
    } else {
      breadcrumb.append("New Project", "/#/projects/new");
    }

    function initEdit(data) {
      breadcrumb.append(data.name, "/#/projects/edit/"+data.id);
      $scope.project = data;
    }

    function formValidator() {
      var isValid = true;
      //name
      if (isValid && ( ! $scope.project.name || $scope.project.name.length < 3)) {
        isValid = false;
      }
      //mysql host
      if (isValid && ( ! $scope.project.mysql_host || $scope.project.mysql_host.length < 1)) {
        isValid = false;
      }
      //mysql port
      if (isValid && ( ! $scope.project.mysql_port || isNaN($scope.project.mysql_port))) {
        isValid = false;
      }
      //mysql user
      if (isValid && ( ! $scope.project.mysql_user || $scope.project.mysql_user.length < 1)) {
        isValid = false;
      }
      return isValid;
    }



  }]);
