'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:SetupviewCtrl
 * @description
 * # SetupviewCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('SetupviewCtrl',
    ['$scope','session', 'viewsModel', '$location', '$routeParams', 'breadcrumb',
    function ($scope, session, viewsModel, $location, $routeParams, breadcrumb) {

      var viewId = $routeParams.id;
      $scope.viewData = {};

      function reload() {
        viewsModel.getById(viewId).then(function(results) {
          angular.copy(results.rows[0], $scope.viewData);
          breadcrumb.append("Configure", "/#/view/"+$scope.viewId + "setup");
        });
      }

      reload();


  }]);
