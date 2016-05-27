'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:MainHeaderCtrl
 * @description
 * # MainHeaderCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('MainHeaderCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

    var isControlSidebarOpened = false;

    $rootScope.$on('toggleControlSidebar', function(){
      $scope.toggleControlSidebar();
    });

    $scope.toggleControlSidebar = function(){
      if (isControlSidebarOpened) {
        $.AdminLTE.controlSidebar.close();
      } else {
        $.AdminLTE.controlSidebar.open();
      }
      isControlSidebarOpened = !isControlSidebarOpened;
    };

  }]);
