'use strict';

/**
 * @ngdoc filter
 * @name electroCrudApp.filter:numbers
 * @function
 * @description
 * # numbers
 * Filter in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .filter('roundUp', function () {
    return function (input) {
      return Math.ceil(input);
    };
  });
