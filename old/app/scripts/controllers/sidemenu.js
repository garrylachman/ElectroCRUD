'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:SidemenuCtrl
 * @description
 * # SidemenuCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('SidemenuCtrl', ['$scope', 'breadcrumb', '$location', '$timeout', 'viewsModel', 'SweetAlert', 'session',
  function($scope, breadcrumb, $location, $timeout, viewsModel, SweetAlert, session) {

    $scope.viewItems = session.projectViews;
    $scope.activeProject = session.activeProject;

    $scope.menuItems = [
      { text: 'Projects', class: 'fa fa-briefcase ', name: 'projects', disabled: false},
      { text: 'Process List Monitor', class: 'fa fa-heart ', name: 'processList', disabled: ($scope.activeProject.id == undefined)}
    ];

    $scope.$watchCollection('activeProject', function(newVal, oldVal){
      $scope.menuItems[1].disabled = (newVal.id == undefined);
    });

    $scope.newViewName = "";
    $scope.addNewView = function(viewName) {
      if ( ! session.getProject())
      {
        SweetAlert.swal("Error", "Open a project first.", "error");
        return;
      }
      viewsModel.add(viewName, session.getProjectId(), 1, "{}")
        .then(function(){
          session.loadViews();
          $scope.viewItems.push({ name: viewName, id:2 });
        })
        .catch(function(err){
          SweetAlert.swal("Error", err, "error");
        });
    };

    $scope.onMenuClick = function(item) {
      if (item.disabled)
      {
        return;
      }
      $timeout(function(){
        $location.path("/" + item.name);
      }, 1);
    };

    $scope.onViewClick = function(id) {
      $timeout(function(){
        $location.path("/view/" + id);
      }, 1);
    };

    $scope.deleteView = function(id) {
      viewsModel.delete(id)
        .then(function(){
          session.loadViews();
        });
    };


  }]);
