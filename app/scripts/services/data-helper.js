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

      return {
        create: function(data) {
          return new Promise(function(resolve, reject) {
            mysql.insertData(connection, schemaBuilder.getTableName(), data)
              .then(function(){
                resolve();
              })
              .catch(function(err){
                reject(err);
              });
          });
        }
      };
    };

    function dh_read(connection, schemaBuilder) {
      if ( ! schemaBuilder.getPermissions().r) {
        return new Error("No Permissions");
      }

      return {
        getRow: function(where){
          return new Promise(function(resolve, reject) {

            mysql.getTableRowData(connection, schemaBuilder.getTableName(),
                                schemaBuilder.getActiveColumnsList(), where)
              .then(function(results){
                resolve(results);
              })
              .catch(function(err){
                reject(err);
              });
          });
        },
        getResults: function(limitFrom, limitCount, sortBy, sortDir) {
          var count,
              rows;
          return new Promise(function(resolve, reject) {
            mysql.getTableCount(connection, schemaBuilder.getTableName()).then(function(countResults){
              count = countResults;

              mysql.getTableData(connection, schemaBuilder.getTableName(),
                                  schemaBuilder.getActiveColumnsList(), limitFrom, limitCount,
                                  sortBy, sortDir).then(function(results){
                resolve({
                  count: count,
                  columns: schemaBuilder.getActiveColumnsList(),
                  rows: results
                });
              })
              .catch(function(err){
                reject(err);
              });

            })
            .catch(function(err){
              reject(err);
            });
          });
        }
      };

    };

    function dh_update(connection, schemaBuilder) {
      if ( ! schemaBuilder.getPermissions().u) {
        return new Error("No Permissions");
      }

      return {
        update: function(data) {
          return new Promise(function(resolve, reject) {
            try {
              // remove primary key while update
              delete data[schemaBuilder.getPrimaryKey()];
            } catch(er) {}
            mysql.updateData(connection, schemaBuilder.getTableName(), data)
              .then(function(){
                resolve();
              })
              .catch(function(err){
                reject(err);
              });
          });
        }
      };
    };

    function dh_delete(connection, schemaBuilder) {
      if ( ! schemaBuilder.getPermissions().d) {
        return new Error("No Permissions");
      }

      return {
        delete: function(data) {
          return new Promise(function(resolve, reject) {
            mysql.deleteData(connection, schemaBuilder.getTableName(), data)
              .then(function(){
                resolve();
              })
              .catch(function(err){
                reject(err);
              });
          });
        }
      };
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
