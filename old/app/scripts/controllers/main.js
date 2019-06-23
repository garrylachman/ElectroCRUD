'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('MainCtrl', ['breadcrumb', function (breadcrumb) {
    breadcrumb.set("Main", "/#/main");
    console.log(breadcrumb);
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
