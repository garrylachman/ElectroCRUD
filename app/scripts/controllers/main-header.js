'use strict';
var updater = require( 'github-update-checker' );
var shell = require('electron').shell;

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
    $scope.isUpdateAvailable = false;

    updater.uptodate({
      'packagePath': process.resourcesPath + "/app/package.json",
      'callback': function( uptodate ) {
        // uptodate is true, false or 'error'
        $scope.isUpdateAvailable = uptodate;
        $scope.$apply();
      }
    });

    $scope.updateClick = function(){
      shell.openExternal('http://garrylachman.github.io/ElectroCRUD/?utm_source=ElectroCRUD&utm_medium=update&utm_campaign=update');
    };

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
