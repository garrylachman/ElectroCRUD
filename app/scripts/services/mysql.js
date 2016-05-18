'use strict';
var mysql  = require('mysql');
var util = require('util');

/**
 * @ngdoc service
 * @name electroCrudApp.mysql
 * @description
 * # mysql
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('mysql', function () {

    return {
      getConnection: function(host, port, user, password, database) {
        var connectionProps = {
          host: host,
          port: port,
          user: user,
          password: password
        };
        if (database) {
          connectionProps.database = database;
        }
        console.log(connectionProps);
        return mysql.createConnection(connectionProps);
      },
      getDatabases: function(connection) {
        return new Promise(function(resolve, reject) {
          connection.query('SHOW DATABASES', function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      getTables: function(connection) {
        return new Promise(function(resolve, reject) {
          connection.query('SHOW TABLES', function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      getTableDesc: function(connection, table) {
        return new Promise(function(resolve, reject) {
          connection.query(util.format('DESC %s', table), function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      getTableCount: function(connection, table) {
        return new Promise(function(resolve, reject) {
          connection.query(util.format('SELECT COUNT(*) as count FROM %s', table), function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows[0].count);
          });
        });
      },
      getTableData: function(connection, table, columns, limitFrom, limitCount) {
        var columnsStr = columns.join(",");
        return new Promise(function(resolve, reject) {
          connection.query(util.format('SELECT %s FROM %s LIMIT %d, %d', columnsStr, table, limitFrom, limitCount), function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      closeConnection: function(connection) {
        connection.end();
      }
    };
  });
