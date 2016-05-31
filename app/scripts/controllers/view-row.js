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
        $scope.tables = [];


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

        function loadTables(){
          var hasViews = $scope.schemaBuilder.getHasViewJson();
          hasViews.forEach(function(_view){
            loadTableData(_view.viewId, _view.localColumn, _view.remoteColumn);
          });
        }

        function loadTableData(viewId, localColumn, remoteColumn) {
            var whereStr = util.format("%s='%s'", remoteColumn, $scope.rowData[localColumn]);
            viewsModel.getById(viewId).then(function(results) {
              var _viewData = results.rows[0];
              _viewData.whereStr = whereStr;
              _viewData.currentPage = 1;
              _viewData.rowsPerPage = 5;
              _viewData.schemaBuilder = schemaHelper.loadBuilder(_viewData.schema);
              _viewData.sortBy = _viewData.schemaBuilder.getActiveColumnsList()[0];
              _viewData.dataHelper = dataHelper.init(session.getConnection(), _viewData.schemaBuilder);
              $scope.tables.push(_viewData);
              loadPageTableData(_viewData);
            });
        }

        function loadPageTableData(_viewData) {
          _viewData.dataHelper.read.getResults((_viewData.currentPage-1)*_viewData.rowsPerPage,
            _viewData.rowsPerPage,
            _viewData.sortBy,
            "ASC",
            _viewData.whereStr)
            .then(function(results){
              _viewData.results = results;
              $scope.progressbar.complete();
              $scope.$apply();
            })
            .catch(function(err){
              console.log(err);
              $scope.progressbar.complete();
            });
        }

        $scope.pageTableChanged = function(_viewData) {
          loadPageTableData(_viewData);
        };

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
              loadTables();
            })
            .catch(function(err){
              console.log(err);
              $scope.progressbar.complete();
            });
        }

  }]);
