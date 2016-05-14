/**
 * @ngdoc overview
 * @name electroCrudApp
 * @description
 * # electroCrudApp
 *
 * Main module of the application.
 */

angular
  .module('electroCrudApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-websql'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/testView.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/projects/add', {
        templateUrl: 'views/addeditproject.html',
        controller: 'AddeditprojectCtrl',
        controllerAs: 'addProject'
      })
      .when('/projects/edit/:id', {
        templateUrl: 'views/addeditproject.html',
        controller: 'AddeditprojectCtrl',
        controllerAs: 'editProject'
      })
      .otherwise({
        redirectTo: '/'
      });

    //$locationProvider.html5Mode(false);
    //$locationProvider.hashPrefix('!');
  });
