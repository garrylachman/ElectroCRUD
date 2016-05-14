'use strict';
var mysql  = require('mysql');

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
        return mysql.createConnection({
          host: host,
          port: port,
          user: user,
          password: password,
          database: database
        });
      },
      getDatabases: function(connection) {
        return new Promise(function(resolve, reject) {
          connection.query('SHOW DATABASES', function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      }
    };
  });
