'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('ProjectsCtrl', ['$scope', 'breadcrumb', 'projectsModel', '$location',
  function ($scope, breadcrumb, projectsModel, $location) {
    breadcrumb.set("Projects", "/#/projects");
    $scope.projects = [];

    function reload() {
      console.log("ProjectsCtrl->reload");
      projectsModel.getList().then(function(results) {
        console.log(results.rows);
        //$scope.projects = results.rows;
        angular.copy(results.rows, $scope.projects);
      });
    }

    reload();

    $scope.editProject = function(id) {
      $location.path("/projects/edit/"+id);
    }

  }]);
