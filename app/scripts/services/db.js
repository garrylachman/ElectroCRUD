'use strict';

/**
 * @ngdoc service
 * @name electroCrudApp.db
 * @description
 * # db
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('db', ['$webSql', function($webSql){
    var db = $webSql.openDatabase('ElectoCRUD', '1.0', 'ElectroCRUD DB', 4 * 1024 * 1024);

    // Create Tables
    db.createTable('projects', {
      "id":{
        "type": "INTEGER",
        "null": "NOT NULL",
        "primary": true,
        "auto_increment": true
      },
      "created":{
        "type": "TIMESTAMP",
        "null": "NOT NULL",
        "default": "CURRENT_TIMESTAMP"
      },
      "name":{
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "mysql_host": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "mysql_port": {
        "type": "INTEGER",
        "null": "NOT NULL"
      },
      "mysql_user": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "mysql_password": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "mysql_db": {
        "type": "TEXT",
        "null": "NOT NULL"
      }
    });

    return db;
  }]);;
