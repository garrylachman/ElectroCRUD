'use strict';

var addSetter = require('setter-method');

/**
 * @ngdoc service
 * @name electroCrudApp.viewFilterHelper
 * @description
 * # viewFilterHelper
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('viewFilterHelper', [function () {

    function viewFilter() {
      var methods =  { };

      addSetter(methods, 'name', 'filter-' + Math.round(Math.random()*1000));
      addSetter(methods, 'title', 'New filter');
      addSetter(methods, 'subTitle', 'filter description');
      addSetter(methods, 'icon', 'fa-bookmark-o');
      addSetter(methods, 'bgColor', 'bg-aqua');
      addSetter(methods, 'params', []);

      methods.addParam = function(_param) {
        methods._params.push(_param);
      };

      methods.removeLastParam = function(){
        methods._params.pop();
      };

      methods.resetParams = function() {
        methods._params = [];
      };

      methods.fromJSON = function(json) {
        for(var item in json) {
          if (methods.hasOwnProperty(item)) {
            methods[item](json[item]);
          }
        }
      };

      methods.fromJSONString = function(jsonStr) {
        return this.fromJSON(JSON.parse(jsonStr));
      };

      methods.toJSON = function() {
        var keys = Object.keys(methods).filter(function(item){
          return (item[0] == "_");
        });
        var obj = {};
        for(var key in keys) {
          key = keys[key].slice(1);
          if (methods.hasOwnProperty(key)) {
            obj[key] = methods[key]();
          }
        }
        return obj;
      };

      methods.toJSONString = function() {
        return JSON.stringify(this.toJSON());
      };

      methods.getWhereSql = function(){
        var _params = this.params();
        var wheres = _params.map(function(where, index){
          var condition = (index >= _params.length-1) ? "" : where.condition;
          return where.column + where.operator + "'"+where.value+"' " + condition;
        });
        return wheres.join(" ");
      };

      return methods;
    }

    var viewFilters = [];
    return {
      getFilters: function(){
        return viewFilters;
      },
      newFilter: function() {
        var _filter = new viewFilter();
        viewFilters.push(_filter);
        return _filter;
      },
      loadFilter: function(json) {
        var b = new viewFilter();
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
      loadFilters: function(json) {
        if (typeof json == "string") {
          json = JSON.parse(json);
        }
        viewFilters = json.map(function(item){
          var _filter = new viewFilter();
          _filter.fromJSON(item);
          return _filter;
        });
        return viewFilters;
      },
      toJSON: function(){
        return viewFilters.map(function(item){
          return item.toJSON()
        });
      },
      reset: function(){
        viewFilters = [];
      },
      delete: function(_filter){
        viewFilters = viewFilters.filter(function(_f){
          return _f != _filter;
        });
      }
    }

  }]);
