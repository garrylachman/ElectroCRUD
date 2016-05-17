'use strict';

/**
 * @ngdoc service
 * @name electroCrudApp.schemaHelper
 * @description
 * # schemaHelper
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('schemaHelper', function () {

    function builder() {
      var tableName = undefined,
          tableColumns = [],
          activeColumns = [],
          term = { one: "", many: "" },
          permissions = { c:true, r: true, u: true, d: true };

      return {
        setTableName: function(name) {
          tableName = name;
        },
        getTableName: function(){
          return tableName;
        },
        setColumns: function(columns) {
          angular.copy(columns, tableColumns);
        },
        getColumns: function(){
          return tableColumns;
        },
        addActiveColumn: function(name) {
          activeColumns.push(name);
        },
        setActiveColumns: function(columns) {
          angular.copy(columns, activeColumns);
        },
        getActiveColumns: function(){
          return activeColumns;
        },
        setTerm: function(_term) {
          angular.copy(_term, term);
        },
        getTerm: function() {
          return term;
        },
        setPermissions: function(_permissions) {
          angular.copy(_permissions, permissions);
        },
        getPermissions: function() {
          return permissions;
        },
        fromJSON: function(json) {
          tableName = json.table;
          if (json.columns) {
            tableColumns = json.columns;
          }
          if (json.active) {
            activeColumns = json.active;
          }
          if (json.term) {
            term = json.term;
          }
          if (json.permissions) {
            permissions = json.permissions;
          }
        },
        fromJSONString: function(jsonStr) {
          return this.fromJSON(JSON.parse(jsonStr));
        },
        toJSON: function(){
          return {
            table: tableName,
            columns: tableColumns,
            active: activeColumns,
            term: term,
            permissions: permissions
          };
        },
        toJSONString: function() {
          return JSON.stringify(this.toJSON());
        }
      }
    };

    return {
      newBuilder: function() {
        return new builder();
      },
      loadBuilder: function(json) {
        var b = new builder();
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
      validateSchema: function(schema) {
        return (schema.table &&
                schema.columns);
      }
    }

  });
