'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:SidemenuCtrl
 * @description
 * # SidemenuCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('SidemenuCtrl', ['$scope', 'breadcrumb', '$location', '$timeout',
  function($scope, breadcrumb, $location, $timeout) {
    $scope.menuItems = [
      { text: 'Projects', class: 'fa fa-briefcase ', name: 'projects'},
      { text: 'Settings', class: 'fa fa-wrench', name: 'settings-btn'}
    ];

    $scope.onMenuClick = function(name) {
      $timeout(function(){
        $location.path("/" + name);
      }, 1);
    };
  }]);
