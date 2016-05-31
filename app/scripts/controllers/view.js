'use strict';
var util = require('util');

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
      'schemaHelper', 'projectsModel', 'dataHelper', 'mysql', 'SweetAlert', 'widgetHelper',
      '$uibModal', 'ngProgressFactory', 'viewFilterHelper', '$rootScope',
    function ($scope, session, viewsModel, $location, $routeParams, breadcrumb,
      schemaHelper, projectsModel, dataHelper, mysql, SweetAlert, widgetHelper,
      $uibModal, ngProgressFactory, viewFilterHelper, $rootScope) {

      var viewId = $routeParams.id;
      $scope.viewId = $routeParams.id;
      $scope.progressbar = ngProgressFactory.createInstance();
      $scope.rowsPerPage = 10;
      $scope.currentPage = 1;
      $scope.viewData = {};
      $scope.isViewEmpty = true;
      $scope.schemaBuilder = undefined;
      $scope.project = undefined;
      $scope.dataHelper = undefined;
      $scope.term = undefined;
      $scope.permissions = {
      };
      $scope.tableData = {
        count: 0,
        columns: [],
        rows: []
      };
      $scope.sortingColumn;
      $scope.sortingDir = "ASC";
      $scope.widgets = [];
      $scope.viewFilters = [];
      $scope.isSearchMode = false;
      $scope.selectedFilter = undefined;
      $scope.primaryKey = undefined;

      var scope = $scope;

      var addFilterListener = $rootScope.$on('addFilter', function(event, args) {
        $scope.addFilter()
      });

      var editFilterListener = $rootScope.$on('editFilter', function(event, args) {
        for (var filter of $scope.viewFilters.getFilters()) {
          if (filter.name() == args) {
            $scope.openFilterSettings(filter);
            return;
          }
        }
      });

      var selectFilterListener = $rootScope.$on('selectFilter', function(event, args) {
        $scope.selectedFilter = undefined;
        for (var filter of $scope.viewFilters.getFilters()) {
          if (filter.name() == args) {
            $scope.selectedFilter = filter;
          }
        }
        // reset the pager & search first
        $scope.currentPage = 1;
        $scope.isSearchMode = false;
        loadTable();
      });

      $scope.$on("$destroy", function() {
        addFilterListener();
        editFilterListener();
        selectFilterListener();
      });

      // widget modal
      $scope.openFilterSettings = function (filter) {
        console.log($scope.viewFilters);
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'viewFiltersModalContent.html',
          controller: 'ModalFilterSettingsInstanceCtrl',
          size: 'lg',
          resolve: {
            columns: function(){ return $scope.schemaBuilder.getActiveColumnsList() },
            filter: function(){ return filter }
          }
        });

        modalInstance.result.then(function(action) {
          if (action == "delete") {
            $scope.viewFilters.delete(filter);
          }
          $scope.schemaBuilder.setFiltersJson($scope.viewFilters.toJSON())
          viewsModel.update(viewId, {
            schema: $scope.schemaBuilder.toJSONString()
          });
          loadFilters();
        });

      };

      // widget modal
      $scope.openWidgetSettings = function (widget) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'myModalContent.html',
          controller: 'ModalWidgetSettingsInstanceCtrl',
          size: 'lg',
          resolve: {
            columns: function(){ return $scope.schemaBuilder.getActiveColumnsList() },
            table: function(){ return $scope.schemaBuilder.getTableName() },
            widget: function(){ return widget }
          }
        });

        modalInstance.result.then(function(action) {
          if (action == "delete") {
            $scope.widgets.delete(widget);
          }
          $scope.schemaBuilder.setWidgetsJson($scope.widgets.toJSON())
          console.log($scope.schemaBuilder.toJSONString());
          viewsModel.update(viewId, {
            schema: $scope.schemaBuilder.toJSONString()
          });
          widget.loadFromDB()
            .then(function(){
              $scope.$apply();
            })
            .catch(function(err){
            });
        });

      };

      $scope.pageChanged = function(page){
        loadTable();
      };

      function reload() {
        viewsModel.getById(viewId).then(function(results) {
          angular.copy(results.rows[0], $scope.viewData);

          projectsModel.getById($scope.viewData.project_id).then(function(projectResults) {
            $scope.project = projectResults.rows[0];
            loadTable();
          });

          try {
            $scope.schemaBuilder = schemaHelper.loadBuilder($scope.viewData.schema);
            $scope.sortingColumn = $scope.schemaBuilder.getActiveColumnsList()[0];
            $scope.primaryKey = $scope.schemaBuilder.getPrimaryKey();
            loadWidgets();
            loadFilters();
          } catch (er) {
            console.log(er);
          }
          $scope.isViewEmpty = isViewEmpty();
          breadcrumb.set($scope.viewData.name, "#/view/"+viewId);
        });
      }

      function loadWidgets() {
        $scope.widgets = widgetHelper;
        $scope.widgets.reset();
        $scope.widgets.loadWidgets($scope.schemaBuilder.getWidgetsJson());
        $scope.widgets.getWidgets().forEach(function(widget){
          widget.setConnection(getConnection());
          widget.loadFromDB()
            .then(function(){
              $scope.$apply();
            })
            .catch(function(err){
            });
        });
      }

      function loadFilters() {
        $scope.viewFilters = viewFilterHelper;
        $scope.viewFilters.reset();
        $scope.viewFilters.loadFilters($scope.schemaBuilder.getFiltersJson());
        session.setViewFilters($scope.viewFilters.toJSON());

        console.log($scope.viewFilters);
      }

      function isViewEmpty() {
        return ( ! $scope.viewData.schema ||
                   $scope.viewData.schema == "{}" ||
                 ! $scope.schemaBuilder.getTableName() ||
                 ! $scope.schemaBuilder.getColumns() ||
                 ! $scope.schemaBuilder.getActiveColumns());
      }

      function getConnection() {
        return session.getConnection();
      }

      function loadTable() {
        if ($scope.isSearchMode) {
          return loadSearchTable();
        }
        $scope.progressbar.start();
        var whereStr = "";
        if ($scope.selectedFilter)  {
          whereStr = $scope.selectedFilter.getWhereSql();
        }
        $scope.term = $scope.schemaBuilder.getTerm();
        $scope.permissions = $scope.schemaBuilder.getPermissions();
        $scope.dataHelper = dataHelper.init(getConnection(), $scope.schemaBuilder);
        $scope.dataHelper.read.getResults(($scope.currentPage-1)*$scope.rowsPerPage,
                                          $scope.rowsPerPage, $scope.sortingColumn,
                                          $scope.sortingDir, whereStr)
          .then(function(results){
            $scope.progressbar.complete();
            $scope.tableData = results;
            $scope.$apply();
          })
          .catch(function(){
            $scope.progressbar.complete();
          });
      }

      function loadSearchTable() {
        $scope.progressbar.start();
        $scope.term = $scope.schemaBuilder.getTerm();
        $scope.permissions = $scope.schemaBuilder.getPermissions();
        $scope.dataHelper = dataHelper.init(getConnection(), $scope.schemaBuilder);
        $scope.dataHelper.read.getSearchResults($scope.schemaBuilder.getActiveColumnsList(), $scope.searchText,
          ($scope.currentPage-1)*$scope.rowsPerPage,
          $scope.rowsPerPage, $scope.sortingColumn,
          $scope.sortingDir)
          .then(function(results){
            console.log(results);
            $scope.progressbar.complete();
            $scope.tableData = results;
            $scope.$apply();
          })
          .catch(function(){
            $scope.progressbar.complete();
          });

      }

      $scope.updateRow = function(row) {
        var rowId = row[$scope.schemaBuilder.getPrimaryKey()];
        $location.path("/view/"+viewId+"/update/"+rowId)
      };

      $scope.doSorting = function(col) {
        $scope.sortingColumn = col;
        $scope.sortingDir = $scope.sortingDir == "ASC" ? "DESC" : "ASC";
        loadTable();
      };

      $scope.deleteRow = function(row) {
        var obj = {};
        obj[$scope.schemaBuilder.getPrimaryKey()] = row[$scope.schemaBuilder.getPrimaryKey()];
        console.log(obj);
        SweetAlert.swal({
          title: "Are you sure?",
          text: "Your will not be able to recover this "+$scope.term.one,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          closeOnConfirm: false,
          closeOnCancel: false },
          function(isConfirm){
             if (isConfirm) {
              $scope.dataHelper = dataHelper.init(getConnection(), $scope.schemaBuilder);
              $scope.dataHelper.delete.delete(obj)
                .then(function(){
                  SweetAlert.swal("Deleted!", "Your "+$scope.term.one+" file has been deleted.", "success");
                  loadTable();
                })
                .catch(function(err){
                  SweetAlert.swal("Error", err, "error");
                });
             }
          });
      };

      $scope.addCounterWidget = function() {
        var widget = widgetHelper.newWidget();
        widget.setType(widgetHelper.widgetType.COUNTER);
        widget.setConnection(getConnection());
        widget.setTitle("Widget 1");
        widget.setSql("select count(*) as count from "+$scope.schemaBuilder.getTableName());
        widget.loadFromDB()
          .then(function(){
            $scope.$apply();
          })
          .catch(function(err){
          });

        saveSchema();
        $scope.openWidgetSettings(widget);
      };

      $scope.addFilter = function() {
        var viewFilter = viewFilterHelper.newFilter()

        saveSchema();
        $scope.openFilterSettings(viewFilter);
      };

      $scope.search = function(){
        $scope.isSearchMode = true;
        loadSearchTable();
      };

      $scope.clearSearch = function(){
        $scope.isSearchMode = false;
        $scope.searchText = "";
        loadTable();
      };

      function saveSchema() {
        console.log($scope.widgets.toJSON());
        $scope.schemaBuilder.setWidgetsJson($scope.widgets.toJSON())
        console.log($scope.schemaBuilder.toJSONString());
        viewsModel.update(viewId, {
          schema: $scope.schemaBuilder.toJSONString()
        });
      }

      reload();

  }]);

  angular.module('electroCrudApp').controller('ModalWidgetSettingsInstanceCtrl',
    function ($scope, $uibModalInstance, columns, table, widget) {

      $scope.params = widget.getParams();
      console.log($scope.params);
      $scope.selectedColumn = $scope.params.column;
      $scope.columns = columns.map(function(column){
        return {
          name: column,
          value: column
        }
      });
      $scope.table = table;
      $scope.inputTitle = widget.getTitle();
      $scope.colors = ['bg-maroon', 'bg-purple', 'bg-navy',
        'bg-orange', 'bg-olive', 'bg-aqua',
        'bg-red', 'bg-green', 'bg-yellow'];
      $scope.selectedBackground = widget.getBg();
      $scope.selectedIcon = widget.getIcon();
      $scope.isDistinct = $scope.params.distinct;
      $scope.selectedFunction = $scope.params.function;

      $scope.onIconSelected = function($item) {
        $scope.selectedIcon = $item;
        widget.setIcon($item);
      }

      $scope.onColumnSelected = function($item) {
      };

      $scope.onBackgroundSelectd = function(color) {
        $scope.selectedBackground = color;
        widget.setBg(color);
      };

      $scope.ok = function () {
        var distinctSql = $scope.isDistinct ? "DISTINCT" : "";

        $scope.params.distinct = distinctSql;
        $scope.params.column = $scope.selectedColumn;
        $scope.params.table = $scope.table;
        $scope.params.function = $scope.selectedFunction;

        var sql = util.format('SELECT %s(%s %s) as count from %s',
          $scope.params.function,
          $scope.params.distinct,
          $scope.params.column,
          $scope.table
        );

        widget.setParams($scope.params);
        widget.setSql(sql);
        widget.setTitle($scope.inputTitle);
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.delete = function(){
        $uibModalInstance.close("delete");
      };

      function getColumnFromSql(str) {
        var re = /SELECT\sCOUNT\(.*\s([a-z0-9_\-]+)\)\s/i;
        var m;

        if ((m = re.exec(str)) !== null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            if (m[1]) {
              return m[1];
            }
        }
      }

      $scope.icons = ['fa-adjust','fa-anchor','fa-archive','fa-area-chart','fa-arrows','fa-arrows-h','fa-arrows-v','fa-asterisk','fa-at','fa-automobile','fa-balance-scale','fa-ban','fa-bank','fa-bar-chart','fa-bar-chart-o','fa-barcode','fa-bars','fa-battery-0','fa-battery-1','fa-battery-2','fa-battery-3','fa-battery-4','fa-battery-empty','fa-battery-full','fa-battery-half','fa-battery-quarter','fa-battery-three-quarters','fa-bed','fa-beer','fa-bell','fa-bell-o','fa-bell-slash','fa-bell-slash-o','fa-bicycle','fa-binoculars','fa-birthday-cake','fa-bolt','fa-bomb','fa-book','fa-bookmark','fa-bookmark-o','fa-briefcase','fa-bug','fa-building','fa-building-o','fa-bullhorn','fa-bullseye','fa-bus','fa-cab','fa-calculator','fa-calendar','fa-calendar-check-o','fa-calendar-minus-o','fa-calendar-o','fa-calendar-plus-o','fa-calendar-times-o','fa-camera','fa-camera-retro','fa-car','fa-caret-square-o-down','fa-caret-square-o-left','fa-caret-square-o-right','fa-caret-square-o-up','fa-cart-arrow-down','fa-cart-plus','fa-cc','fa-certificate','fa-check','fa-check-circle','fa-check-circle-o','fa-check-square','fa-check-square-o','fa-child','fa-circle','fa-circle-o','fa-circle-o-notch','fa-circle-thin','fa-clock-o','fa-clone','fa-close','fa-cloud','fa-cloud-download','fa-cloud-upload','fa-code','fa-code-fork','fa-coffee','fa-cog','fa-cogs','fa-comment','fa-comment-o','fa-commenting','fa-commenting-o','fa-comments','fa-comments-o','fa-compass','fa-copyright','fa-creative-commons','fa-credit-card','fa-crop','fa-crosshairs','fa-cube','fa-cubes','fa-cutlery','fa-dashboard','fa-database','fa-desktop','fa-diamond','fa-dot-circle-o','fa-download','fa-edit','fa-ellipsis-h','fa-ellipsis-v','fa-envelope','fa-envelope-o','fa-envelope-square','fa-eraser','fa-exchange','fa-exclamation','fa-exclamation-circle','fa-exclamation-triangle','fa-external-link','fa-external-link-square','fa-eye','fa-eye-slash','fa-eyedropper','fa-fax','fa-feed','fa-female','fa-fighter-jet','fa-file-archive-o','fa-file-audio-o','fa-file-code-o','fa-file-excel-o','fa-file-image-o','fa-file-movie-o','fa-file-pdf-o','fa-file-photo-o','fa-file-picture-o','fa-file-powerpoint-o','fa-file-sound-o','fa-file-video-o','fa-file-word-o','fa-file-zip-o','fa-film','fa-filter','fa-fire','fa-fire-extinguisher','fa-flag','fa-flag-checkered','fa-flag-o','fa-flash','fa-flask','fa-folder','fa-folder-o','fa-folder-open','fa-folder-open-o','fa-frown-o','fa-futbol-o','fa-gamepad','fa-gavel','fa-gear','fa-gears','fa-gift','fa-glass','fa-globe','fa-graduation-cap','fa-group','fa-hand-grab-o','fa-hand-lizard-o','fa-hand-paper-o','fa-hand-peace-o','fa-hand-pointer-o','fa-hand-rock-o','fa-hand-scissors-o','fa-hand-spock-o','fa-hand-stop-o','fa-hdd-o','fa-headphones','fa-heart','fa-heart-o','fa-heartbeat','fa-history','fa-home','fa-hotel','fa-hourglass','fa-hourglass-1','fa-hourglass-2','fa-hourglass-3','fa-hourglass-end','fa-hourglass-half','fa-hourglass-o','fa-hourglass-start','fa-i-cursor','fa-image','fa-inbox','fa-industry','fa-info','fa-info-circle','fa-institution','fa-key','fa-keyboard-o','fa-language','fa-laptop','fa-leaf','fa-legal','fa-lemon-o','fa-level-down','fa-level-up','fa-life-bouy','fa-life-buoy','fa-life-ring','fa-life-saver','fa-lightbulb-o','fa-line-chart','fa-location-arrow','fa-lock','fa-magic','fa-magnet','fa-mail-forward','fa-mail-reply','fa-mail-reply-all','fa-male','fa-map','fa-map-marker','fa-map-o','fa-map-pin','fa-map-signs','fa-meh-o','fa-microphone','fa-microphone-slash','fa-minus','fa-minus-circle','fa-minus-square','fa-minus-square-o','fa-mobile','fa-mobile-phone','fa-money','fa-moon-o','fa-mortar-board','fa-motorcycle','fa-mouse-pointer','fa-music','fa-navicon','fa-newspaper-o','fa-object-group','fa-object-ungroup','fa-paint-brush','fa-paper-plane','fa-paper-plane-o','fa-paw','fa-pencil','fa-pencil-square','fa-pencil-square-o','fa-phone','fa-phone-square','fa-photo','fa-picture-o','fa-pie-chart','fa-plane','fa-plug','fa-plus','fa-plus-circle','fa-plus-square','fa-plus-square-o','fa-power-off','fa-print','fa-puzzle-piece','fa-qrcode','fa-question','fa-question-circle','fa-quote-left','fa-quote-right','fa-random','fa-recycle','fa-refresh','fa-registered','fa-remove','fa-reorder','fa-reply','fa-reply-all','fa-retweet','fa-road','fa-rocket','fa-rss','fa-rss-square','fa-search','fa-search-minus','fa-search-plus','fa-send','fa-send-o','fa-server','fa-share','fa-share-alt','fa-share-alt-square','fa-share-square','fa-share-square-o','fa-shield','fa-ship','fa-shopping-cart','fa-sign-in','fa-sign-out','fa-signal','fa-sitemap','fa-sliders','fa-smile-o','fa-soccer-ball-o','fa-sort','fa-sort-alpha-asc','fa-sort-alpha-desc','fa-sort-amount-asc','fa-sort-amount-desc','fa-sort-asc','fa-sort-desc','fa-sort-down','fa-sort-numeric-asc','fa-sort-numeric-desc','fa-sort-up','fa-space-shuttle','fa-spinner','fa-spoon','fa-square','fa-square-o','fa-star','fa-star-half','fa-star-half-empty','fa-star-half-full','fa-star-half-o','fa-star-o','fa-sticky-note','fa-sticky-note-o','fa-street-view','fa-suitcase','fa-sun-o','fa-support','fa-tablet','fa-tachometer','fa-tag','fa-tags','fa-tasks','fa-taxi','fa-television','fa-terminal','fa-thumb-tack','fa-thumbs-down','fa-thumbs-o-down','fa-thumbs-o-up','fa-thumbs-up','fa-ticket','fa-times','fa-times-circle','fa-times-circle-o','fa-tint','fa-toggle-down','fa-toggle-left','fa-toggle-off','fa-toggle-on','fa-toggle-right','fa-toggle-up','fa-trademark','fa-trash','fa-trash-o','fa-tree','fa-trophy','fa-truck','fa-tty','fa-tv','fa-umbrella','fa-university','fa-unlock','fa-unlock-alt','fa-unsorted','fa-upload','fa-user','fa-user-plus','fa-user-secret','fa-user-times','fa-users','fa-video-camera','fa-volume-down','fa-volume-off','fa-volume-up','fa-warning','fa-wheelchair','fa-wifi','fa-wrench'];

  });


  angular.module('electroCrudApp').controller('ModalFilterSettingsInstanceCtrl',
    function ($scope, $uibModalInstance, columns, filter, viewFilterHelper) {

      $scope.params = filter.params();

      console.log($scope.params);
      $scope.columns = columns.map(function(column){
        return {
          name: column,
          value: column
        }
      });
      $scope.inputTitle = filter.title();
      $scope.inputSubTitle = filter.subTitle();
      $scope.colors = ['bg-maroon', 'bg-purple', 'bg-navy',
        'bg-orange', 'bg-olive', 'bg-aqua',
        'bg-red', 'bg-green', 'bg-yellow'];
      $scope.selectedBackground = filter.bgColor();
      $scope.selectedIcon = filter.icon();

      $scope.addClause = function(){
        $scope.params.push({});
      };

      $scope.onIconSelected = function($item) {
        $scope.selectedIcon = $item;
        filter.icon($item);
      }

      $scope.onBackgroundSelectd = function(color) {
        $scope.selectedBackground = color;
        filter.bgColor(color);
      };

      $scope.ok = function () {
        filter.title($scope.inputTitle);
        filter.subTitle($scope.inputSubTitle);

        filter.resetParams();
        $scope.params.forEach(function(item){
          filter.addParam({
            column: item.column,
            operator: item.operator,
            value: item.value,
            condition: item.condition
          });
        });

        console.log(filter);

        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.delete = function(){
        $uibModalInstance.close("delete");
      };

      $scope.icons = ['fa-adjust','fa-anchor','fa-archive','fa-area-chart','fa-arrows','fa-arrows-h','fa-arrows-v','fa-asterisk','fa-at','fa-automobile','fa-balance-scale','fa-ban','fa-bank','fa-bar-chart','fa-bar-chart-o','fa-barcode','fa-bars','fa-battery-0','fa-battery-1','fa-battery-2','fa-battery-3','fa-battery-4','fa-battery-empty','fa-battery-full','fa-battery-half','fa-battery-quarter','fa-battery-three-quarters','fa-bed','fa-beer','fa-bell','fa-bell-o','fa-bell-slash','fa-bell-slash-o','fa-bicycle','fa-binoculars','fa-birthday-cake','fa-bolt','fa-bomb','fa-book','fa-bookmark','fa-bookmark-o','fa-briefcase','fa-bug','fa-building','fa-building-o','fa-bullhorn','fa-bullseye','fa-bus','fa-cab','fa-calculator','fa-calendar','fa-calendar-check-o','fa-calendar-minus-o','fa-calendar-o','fa-calendar-plus-o','fa-calendar-times-o','fa-camera','fa-camera-retro','fa-car','fa-caret-square-o-down','fa-caret-square-o-left','fa-caret-square-o-right','fa-caret-square-o-up','fa-cart-arrow-down','fa-cart-plus','fa-cc','fa-certificate','fa-check','fa-check-circle','fa-check-circle-o','fa-check-square','fa-check-square-o','fa-child','fa-circle','fa-circle-o','fa-circle-o-notch','fa-circle-thin','fa-clock-o','fa-clone','fa-close','fa-cloud','fa-cloud-download','fa-cloud-upload','fa-code','fa-code-fork','fa-coffee','fa-cog','fa-cogs','fa-comment','fa-comment-o','fa-commenting','fa-commenting-o','fa-comments','fa-comments-o','fa-compass','fa-copyright','fa-creative-commons','fa-credit-card','fa-crop','fa-crosshairs','fa-cube','fa-cubes','fa-cutlery','fa-dashboard','fa-database','fa-desktop','fa-diamond','fa-dot-circle-o','fa-download','fa-edit','fa-ellipsis-h','fa-ellipsis-v','fa-envelope','fa-envelope-o','fa-envelope-square','fa-eraser','fa-exchange','fa-exclamation','fa-exclamation-circle','fa-exclamation-triangle','fa-external-link','fa-external-link-square','fa-eye','fa-eye-slash','fa-eyedropper','fa-fax','fa-feed','fa-female','fa-fighter-jet','fa-file-archive-o','fa-file-audio-o','fa-file-code-o','fa-file-excel-o','fa-file-image-o','fa-file-movie-o','fa-file-pdf-o','fa-file-photo-o','fa-file-picture-o','fa-file-powerpoint-o','fa-file-sound-o','fa-file-video-o','fa-file-word-o','fa-file-zip-o','fa-film','fa-filter','fa-fire','fa-fire-extinguisher','fa-flag','fa-flag-checkered','fa-flag-o','fa-flash','fa-flask','fa-folder','fa-folder-o','fa-folder-open','fa-folder-open-o','fa-frown-o','fa-futbol-o','fa-gamepad','fa-gavel','fa-gear','fa-gears','fa-gift','fa-glass','fa-globe','fa-graduation-cap','fa-group','fa-hand-grab-o','fa-hand-lizard-o','fa-hand-paper-o','fa-hand-peace-o','fa-hand-pointer-o','fa-hand-rock-o','fa-hand-scissors-o','fa-hand-spock-o','fa-hand-stop-o','fa-hdd-o','fa-headphones','fa-heart','fa-heart-o','fa-heartbeat','fa-history','fa-home','fa-hotel','fa-hourglass','fa-hourglass-1','fa-hourglass-2','fa-hourglass-3','fa-hourglass-end','fa-hourglass-half','fa-hourglass-o','fa-hourglass-start','fa-i-cursor','fa-image','fa-inbox','fa-industry','fa-info','fa-info-circle','fa-institution','fa-key','fa-keyboard-o','fa-language','fa-laptop','fa-leaf','fa-legal','fa-lemon-o','fa-level-down','fa-level-up','fa-life-bouy','fa-life-buoy','fa-life-ring','fa-life-saver','fa-lightbulb-o','fa-line-chart','fa-location-arrow','fa-lock','fa-magic','fa-magnet','fa-mail-forward','fa-mail-reply','fa-mail-reply-all','fa-male','fa-map','fa-map-marker','fa-map-o','fa-map-pin','fa-map-signs','fa-meh-o','fa-microphone','fa-microphone-slash','fa-minus','fa-minus-circle','fa-minus-square','fa-minus-square-o','fa-mobile','fa-mobile-phone','fa-money','fa-moon-o','fa-mortar-board','fa-motorcycle','fa-mouse-pointer','fa-music','fa-navicon','fa-newspaper-o','fa-object-group','fa-object-ungroup','fa-paint-brush','fa-paper-plane','fa-paper-plane-o','fa-paw','fa-pencil','fa-pencil-square','fa-pencil-square-o','fa-phone','fa-phone-square','fa-photo','fa-picture-o','fa-pie-chart','fa-plane','fa-plug','fa-plus','fa-plus-circle','fa-plus-square','fa-plus-square-o','fa-power-off','fa-print','fa-puzzle-piece','fa-qrcode','fa-question','fa-question-circle','fa-quote-left','fa-quote-right','fa-random','fa-recycle','fa-refresh','fa-registered','fa-remove','fa-reorder','fa-reply','fa-reply-all','fa-retweet','fa-road','fa-rocket','fa-rss','fa-rss-square','fa-search','fa-search-minus','fa-search-plus','fa-send','fa-send-o','fa-server','fa-share','fa-share-alt','fa-share-alt-square','fa-share-square','fa-share-square-o','fa-shield','fa-ship','fa-shopping-cart','fa-sign-in','fa-sign-out','fa-signal','fa-sitemap','fa-sliders','fa-smile-o','fa-soccer-ball-o','fa-sort','fa-sort-alpha-asc','fa-sort-alpha-desc','fa-sort-amount-asc','fa-sort-amount-desc','fa-sort-asc','fa-sort-desc','fa-sort-down','fa-sort-numeric-asc','fa-sort-numeric-desc','fa-sort-up','fa-space-shuttle','fa-spinner','fa-spoon','fa-square','fa-square-o','fa-star','fa-star-half','fa-star-half-empty','fa-star-half-full','fa-star-half-o','fa-star-o','fa-sticky-note','fa-sticky-note-o','fa-street-view','fa-suitcase','fa-sun-o','fa-support','fa-tablet','fa-tachometer','fa-tag','fa-tags','fa-tasks','fa-taxi','fa-television','fa-terminal','fa-thumb-tack','fa-thumbs-down','fa-thumbs-o-down','fa-thumbs-o-up','fa-thumbs-up','fa-ticket','fa-times','fa-times-circle','fa-times-circle-o','fa-tint','fa-toggle-down','fa-toggle-left','fa-toggle-off','fa-toggle-on','fa-toggle-right','fa-toggle-up','fa-trademark','fa-trash','fa-trash-o','fa-tree','fa-trophy','fa-truck','fa-tty','fa-tv','fa-umbrella','fa-university','fa-unlock','fa-unlock-alt','fa-unsorted','fa-upload','fa-user','fa-user-plus','fa-user-secret','fa-user-times','fa-users','fa-video-camera','fa-volume-down','fa-volume-off','fa-volume-up','fa-warning','fa-wheelchair','fa-wifi','fa-wrench'];

  });
