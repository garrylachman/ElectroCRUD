'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('ProjectsCtrl', ['$scope', 'breadcrumb', 'projectsModel', '$location', 'session', 'SweetAlert',
  function ($scope, breadcrumb, projectsModel, $location, session, SweetAlert) {
    breadcrumb.set("Projects", "#/projects");
    $scope.projects = [];

    function reload() {
      projectsModel.getList().then(function(results) {
        angular.copy(results.rows, $scope.projects);
      });
    }

    reload();

    $scope.editProject = function(id) {
      $location.path("/projects/edit/"+id);
    };

    $scope.openProject = function(projectId) {
      session.openProject(projectId)
        .then(function(){
          SweetAlert.swal("Success", "Login Success.", "success");
        })
        .catch(function(err){
          SweetAlert.swal("Error", err, "error");
        });
    };

  }]);
