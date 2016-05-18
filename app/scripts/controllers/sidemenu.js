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
    $scope.menuItems = [
      { text: 'Projects', class: 'fa fa-briefcase ', name: 'projects'}
    ];

    $scope.viewItems = session.projectViews;

    $scope.newViewName = "";
    $scope.addNewView = function(viewName) {
      console.log(session.getProject());
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

    $scope.onMenuClick = function(name) {
      $timeout(function(){
        $location.path("/" + name);
      }, 1);
    };

    $scope.onViewClick = function(id) {
      $timeout(function(){
        $location.path("/view/" + id);
      }, 1);
    };


  }]);
