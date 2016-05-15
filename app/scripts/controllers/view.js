'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('ViewCtrl',
    ['$scope','session', 'viewsModel', '$location', '$routeParams', 'breadcrumb',
    function ($scope, session, viewsModel, $location, $routeParams, breadcrumb) {

      var viewId = $routeParams.id;
      $scope.viewData = {};

      function reload() {
        viewsModel.getById(viewId).then(function(results) {
          angular.copy(results.rows[0], $scope.viewData);
          breadcrumb.set($scope.viewData.name, "/#/view/"+$scope.viewId);
        });
      }

      reload();

  }]);
