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
          console.log(this.toJSON());
        },
        setColumns: function(columns) {
          angular.copy(columns, tableColumns);
          console.log(this.toJSON());
        },
        addActiveColumn: function(name) {
          activeColumns.push(name);
          console.log(this.toJSON());
        },
        setActiveColumns: function(columns) {
          angular.copy(columns, activeColumns);
          console.log(this.toJSON());
        },
        fromJSON: function(json) {
          tableName = json.table;
          tableColumns = json.columns;
          activeColumns = json.activeColumns
        },
        fromJSONString: function(jsonStr) {
          return fromJSON(this.JSON.parse(jsonStr));
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
