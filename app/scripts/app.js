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
    'angular-websql',
    'oitozero.ngSweetAlert',
    'ui.select',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider, uiSelectConfig) {
    $routeProvider
      .when('/', {
        redirectTo: '/projects'
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
      .when('/view/:id', {
        templateUrl: 'views/view.html',
        controller: 'ViewCtrl'
      })
      .when('/view/:id/setup', {
        templateUrl: 'views/setupview.html',
        controller: 'SetupviewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      uiSelectConfig.theme = 'bootstrap';
      uiSelectConfig.resetSearchInput = true;
      uiSelectConfig.appendToBody = true;

    //$locationProvider.html5Mode(false);
    //$locationProvider.hashPrefix('!');
  });
