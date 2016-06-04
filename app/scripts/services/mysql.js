'use strict';
var mysql  = require('mysql');
var util = require('util');
var tunnel = require('tunnel-ssh').tunnel;

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
      getConnection: function(info) {
        var _this = this;
        if (info.connection_type == "direct") {
          return new Promise(function(resolve, reject) {
              resolve(_this.getDirectConnection(info.mysql_host, info.mysql_port,
                info.mysql_user, info.mysql_password, info.mysql_db));
          });
        } else if (info.connection_type == "ssh") {
          return _this.getTunnelConnection(info.ssh_host, info.mysql_port,
            info.ssh_user, info.ssh_password,
            info.mysql_host, info.mysql_port,
            info.mysql_user, info.mysql_password,
            info.mysql_db)
        } else {
          return new Promise(function(resolve, reject) {
            reject();
          });
        }
      },
      getTunnelConnection: function(ssh_host, ssh_port, ssh_username, ssh_password,
        mysql_host, mysql_port, mysql_user, mysql_password, mysql_database) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var tunnelPort = Math.round(Math.random()*10000);
          var config = {
            host: ssh_host,
            srcPort: tunnelPort,
            dstPort: ssh_port,
            username: ssh_username,
            password: ssh_password
          };
          var server = tunnel(config)
            .then(function (result) {
              resolve(_this.getDirectConnection(mysql_host, tunnelPort, mysql_user, mysql_password, mysql_database));
            })
            .catch(function (err) {
              reject(err);
            })
        });
      },
      getDirectConnection: function(host, port, user, password, database) {
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
          if (!connection) reject();
          connection.query('SHOW DATABASES', function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      getTables: function(connection) {
        return new Promise(function(resolve, reject) {
          if (!connection) reject();
          connection.query('SHOW TABLES', function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      getTableDesc: function(connection, table) {
        return new Promise(function(resolve, reject) {
          if (!connection) reject();
          connection.query(util.format('DESC `%s`', table), function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      getTableCount: function(connection, table, whereStr) {
        var whereSql = whereStr ? util.format('WHERE %s', whereStr) : '';
        return new Promise(function(resolve, reject) {
          if (!connection) reject();
          connection.query(util.format('SELECT COUNT(*) as count FROM `%s` %s', table, whereSql), function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows[0].count);
          });
        });
      },
      getTableData: function(connection, table, columns, limitFrom, limitCount, sortBy, sortDir, whereStr) {
        sortBy = !sortBy ? 1 : sortBy;
        sortDir = !sortDir ? "ASC" : sortDir;
        whereStr = whereStr ? util.format('WHERE %s', whereStr) : '';
        return new Promise(function(resolve, reject) {
          if (!connection) reject();
          connection.query('SELECT ?? FROM `??` '+whereStr+' ORDER BY ?? '+sortDir+' LIMIT '+limitFrom+', '+limitCount, [columns, table, sortBy], function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      getQuery: function(connection, sql) {
        return new Promise(function(resolve, reject) {
          if (!connection) reject();
          connection.query(sql, function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      getTableRowData: function(connection, table, columns, where) {
        console.log(where);
        return new Promise(function(resolve, reject) {
          if (!connection) reject();
          connection.query('SELECT ?? FROM `'+table+'` WHERE ?', [columns, where],function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      insertData: function(connection, table, data) {
        return new Promise(function(resolve, reject) {
          if (!connection) reject();
          connection.query('INSERT INTO `'+table+'` SET ?', data, function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      updateData: function(connection, table, data) {
        return new Promise(function(resolve, reject) {
          if (!connection) reject();
          connection.query('UPDATE IGNORE `'+table+'` SET ?', data, function(err, rows, fields) {
            if (err) reject(err);
            resolve(rows);
          });
        });
      },
      deleteData: function(connection, table, data) {
        return new Promise(function(resolve, reject) {
          if (!connection) reject();
          connection.query('DELETE FROM `'+table+'` WHERE ?', data, function(err, rows, fields) {
            if (err) reject(err);
            resolve();
          });
        });
      },
      closeConnection: function(connection) {
        connection.end();
      }
    };
  });
