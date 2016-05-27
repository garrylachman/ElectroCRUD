'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:RightSideBarCtrl
 * @description
 * # RightSideBarCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('RightSideBarCtrl', ['$scope', '$rootScope', 'viewsModel', 'SweetAlert', 'session',
  function($scope, $rootScope, viewsModel, SweetAlert, session) {

    $scope.viewFilters = session.activeViewFilters;

    $scope.editFilter = function(filter) {
      $rootScope.$emit('editFilter', filter.name);
    };

    $scope.addFilter = function(){
      $rootScope.$emit('addFilter');
    };

    $scope.resetFilter = function(){
      for (var filter of $scope.viewFilters) {
        filter.selected = false;
      }
      $rootScope.$emit('selectFilter');
      $rootScope.$emit('toggleControlSidebar');
    };

    $scope.selectFilter = function(name) {
      for (var filter of $scope.viewFilters) {
        filter.selected = filter.name == name;
      }
      $rootScope.$emit('selectFilter', name);
      $rootScope.$emit('toggleControlSidebar');
    };

  }]);
