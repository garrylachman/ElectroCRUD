'use strict';
var util = require('util');
var _ = require('lodash');
var _ = require('lodash/core');
var _collections = require('lodash/collection');
var _array = require('lodash/array');

/**
 * @ngdoc function
 * @name electroCrudApp.controller:ViewRowCtrl
 * @description
 * # ViewRowCtrl
 * Controller of the electroCrudApp
 */
angular.module('electroCrudApp')
  .controller('ViewRowCtrl',
    ['$scope','session', 'viewsModel', '$routeParams', 'breadcrumb',
      'schemaHelper', 'projectsModel', 'dataHelper', 'mysql', 'ngProgressFactory',
    function ($scope, session, viewsModel, $routeParams, breadcrumb,
      schemaHelper, projectsModel, dataHelper, mysql, ngProgressFactory) {

        var viewId = $routeParams.id;
        var key = $routeParams.key;
        $scope.rowKey = key;
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.viewData = {};
        $scope.rowData = undefined;
        $scope.schemaBuilder = undefined;
        $scope.project = undefined;
        $scope.dataHelper = undefined;
        $scope.term = undefined;


        load();

        function load() {
          viewsModel.getById(viewId).then(function(results) {
            angular.copy(results.rows[0], $scope.viewData);

            projectsModel.getById($scope.viewData.project_id).then(function(projectResults) {
              $scope.project = projectResults.rows[0];
            });

            try {
              $scope.schemaBuilder = schemaHelper.loadBuilder($scope.viewData.schema);
              $scope.sortingColumn = $scope.schemaBuilder.getActiveColumnsList()[0];
              $scope.term = $scope.schemaBuilder.getTerm();
              console.log($scope.term);

              breadcrumb.append($scope.term.one + " " + key, "#/view/"+viewId+"/row/" + key);

              loadRowData();
            } catch (er) {
              console.log(er);
            }
          });
        }

        function loadRowData() {
          var where = {};
          where[$scope.schemaBuilder.getPrimaryKey()] = key;

          $scope.dataHelper = dataHelper.init(session.getConnection(), $scope.schemaBuilder);
          $scope.dataHelper.read.getRow(where)
            .then(function(results){
              $scope.progressbar.complete();
              $scope.rowData = results[0];
              $scope.rowDataColumns = _array.chunk(_collections.map($scope.rowData, (v,k) => {
                return {key: k, value: v};
              }), 2);
              $scope.$apply();
            })
            .catch(function(err){
              console.log(err);
              $scope.progressbar.complete();
            });
        }

  }]);
