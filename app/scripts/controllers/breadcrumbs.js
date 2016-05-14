'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:BreadcrumbsCtrl
 * @description
 * # BreadcrumbsCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('BreadcrumbsCtrl', ['$scope', 'breadcrumb', function ($scope, breadcrumb) {
    $scope.items = breadcrumb.breadcrumbs;
    $scope.pageTitle = breadcrumb.pageTitle;

    $scope.$watchCollection('items', function() {
      $scope.pageTitle = breadcrumb.getTitle();
    });
  }]);
