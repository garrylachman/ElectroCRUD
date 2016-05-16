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
          activeColumns = []

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
        fromJSON: function(json) {
          tableName = json.table;
          tableColumns = json.columns;
          activeColumns = json.active;
        },
        fromJSONString: function(jsonStr) {
          return this.fromJSON(JSON.parse(jsonStr));
        },
        toJSON: function(){
          return {
            table: tableName,
            columns: tableColumns,
            active: activeColumns
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
                schema.columns &&
                schema.active);
      }
    }

  });
