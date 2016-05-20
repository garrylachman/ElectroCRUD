'use strict';

/**
 * @ngdoc service
 * @name electroCrudApp.widgetHelper
 * @description
 * # widgetHelper
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('widgetHelper', ['mysql', function (mysql) {

    var widgetType = {
      COUNTER: 'widgetTypeCounter'
    };

    function widget() {
      var widgetType = undefined,
        sql = undefined,
        title = "New Widget",
        icon = "fa-bookmark-o",
        bg = "bg-aqua",
        widgetValue = "#",
        mysqlConnection = undefined;

      return {
        create: function() {

        },
        setConnection: function(connection) {
          mysqlConnection = connection;
        },
        loadFromDB: function(){
          return new Promise(function(resolve, reject) {
            mysql.getQuery(mysqlConnection, sql)
              .then(function(result){
                widgetValue = result[0].count;
                resolve();
              });
          });
        },
        setType: function(wType) {
          widgetType = wType;
        },
        getType: function() {
          return widgetType;
        },
        setSql: function(wSql) {
          sql = wSql;
        },
        getSql: function() {
          return sql;
        },
        setTitle: function(wTitle) {
          title = wTitle;
        },
        getTitle: function() {
          return title;
        },
        setIcon: function(wIcon) {
          icon = wIcon;
        },
        getIcon: function() {
          return icon;
        },
        setBg: function(wBg) {
          bg = wBg;
        },
        getBg: function() {
          return bg;
        },
        getValue: function() {
          return widgetValue;
        },
        fromJSON: function(json) {
          widgetType = json.type;
          sql = json.sql;
          title = json.title;
          icon = json.icon;
          bg = json.bg;
        },
        fromJSONString: function(jsonStr) {
          return this.fromJSON(JSON.parse(jsonStr));
        },
        toJSON: function(){
          return {
            type: widgetType,
            sql: sql,
            title: title,
            icon: icon,
            bg: bg
          };
        },
        toJSONString: function() {
          return JSON.stringify(this.toJSON());
        }
      };
    }

    var widgets = [];
    return {
      widgetType: widgetType,
      getWidgets: function(){
        return widgets;
      },
      newWidget: function() {
        var _widget = new widget();
        widgets.push(_widget);
        return _widget;
      },
      loadWidget: function(json) {
        var b = new widget();
        switch (typeof json) {
          case "string":
            b.fromJSONString(json);
          break;
          case "object":
            b.fromJSON(json);
          break;
        }
        return b;
      },
      loadWidgets: function(json) {
        if (typeof json == "string") {
          json = JSON.parse(json);
        }
        widgets = json.map(function(item){
          var _widget = new widget();
          _widget.fromJSON(item);
          return _widget;
        });
        return widgets;
      },
      toJSON: function(){
        return widgets.map(function(item){
          return item.toJSON()
        });
      },
      reset: function(){
        widgets = [];
      },
      delete: function(_widget){
        widgets = widgets.filter(function(_w){
          return _w != _widget;
        });
      }
    }

  }]);
