'use strict';

/**
 * @ngdoc service
 * @name electroCrudApp.dataHelper
 * @description
 * # dataHelper
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('dataHelper', ['mysql', function (mysql) {

    function dh_create(connection, schemaBuilder) {
      if ( ! schemaBuilder.getPermissions().c) {
        return new Error("No Permissions");
      }
    };

    function dh_read(connection, schemaBuilder) {
      if ( ! schemaBuilder.getPermissions().r) {
        return new Error("No Permissions");
      }

      return {
        getResults: function(limitFrom, limitCount) {
          var count,
              rows;
          return new Promise(function(resolve, reject) {
            mysql.getTableCount(connection, schemaBuilder.getTableName()).then(function(countResults){
              count = countResults;

              mysql.getTableData(connection, schemaBuilder.getTableName(),
                                  schemaBuilder.getActiveColumnsList(), limitFrom, limitCount).then(function(results){
                resolve({
                  count: count,
                  columns: schemaBuilder.getActiveColumnsList(),
                  rows: results
                });
              });

            });
          });
        }
      };

    };

    function dh_update(connection, schemaBuilder) {
      if ( ! schemaBuilder.getPermissions().u) {
        return new Error("No Permissions");
      }
    };

    function dh_delete(connection, schemaBuilder) {
      if ( ! schemaBuilder.getPermissions().d) {
        return new Error("No Permissions");
      }
    };

    return {
      init: function(connection, schemaBuilder) {

        var c = new dh_create(connection, schemaBuilder);
        var r = new dh_read(connection, schemaBuilder);
        var u = new dh_update(connection, schemaBuilder);
        var d = new dh_delete(connection, schemaBuilder);

        return {
          create: c,
          read: r,
          update: u,
          delete: d
        };
      }
    };

  }]);
