'use strict';

/**
 * @ngdoc function
 * @name electroCrudApp.controller:ProcessListCtrl
 * @description
 * # ProcessListCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('ProcessListCtrl',
    ['$scope','session', 'breadcrumb', 'mysql', 'ngProgressFactory', '$interval',
    function ($scope, session, breadcrumb, mysql, ngProgressFactory, $interval) {
      console.log("ProcessListCtrl")

      breadcrumb.set("Process List Monitor", "#/processList");

      $scope.process = [];
      $scope.progressbar = ngProgressFactory.createInstance();
      $scope.reloadIntervalMs = 5 * 1000; //5 seconds
      var intervalId = undefined;

      function startMonitor() {
        intervalId = $interval(loadProcessList, $scope.reloadIntervalMs);
        loadProcessList();
      }

      function stopMonitor() {
        $interval.cancel(intervalId);
      }

      function loadProcessList() {
        $scope.progressbar.start();
        var connection = session.getConnection();
        mysql.getQuery(connection, "SHOW PROCESSLIST")
          .then(function(resuts){
            $scope.progressbar.complete();
            $scope.process = resuts;
          })
          .catch(function(err) {
            $scope.progressbar.complete();
          });
      }

      startMonitor();

      $scope.$on("$destroy", function() {
        stopMonitor();
      });

  }]);
