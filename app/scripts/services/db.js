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
      },
      "connection_type": {
        "type": "TEXT",
        "null": "NOT NULL",
        "default": "direct"
      },
      "ssh_host": {
        "type": "TEXT"
      },
      "ssh_user": {
        "type": "TEXT"
      },
      "ssh_password": {
        "type": "TEXT"
      }
    });

    db.createTable('views', {
      "id":{
        "type": "INTEGER",
        "null": "NOT NULL",
        "primary": true,
        "auto_increment": true
      },
      "project_id": {
        "type": "INTEGER",
        "null": "NOT NULL"
      },
      "created":{
        "type": "TIMESTAMP",
        "null": "NOT NULL",
        "default": "CURRENT_TIMESTAMP"
      },
      "view_type": {
        "type": "INTEGER",
        "null": "NOT NULL"
      },
      "name":{
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "schema": {
        "type": "TEXT",
        "null": "NOT NULL"
      }
    });

    function parseTable(table){
      var s = table.sql.split(',');
      s[0] = s[0].replace(new RegExp('create\\s+table\\s+' + table.name + '\\s*\\(', 'i'),'');
      table.fields = s.map(function(i){
        return i.trim().split(/\s/).shift();
      })
      .filter(function(i){
        return (i.indexOf(')') === -1)
      });
      return table;
    }

    // Migrations
    db.executeQuery("SELECT * FROM sqlite_master WHERE name NOT LIKE 'sqlite\\_%' escape '\\' AND name NOT LIKE '\\_%' escape '\\'").then(function(results) {
      var tables = Array.from(results.rows).map(parseTable);
      tables.forEach(function(table){
        if (table.name == "projects") {
          // Migration from 0.3.1 - add ssh
          if (table.fields.indexOf("`connection_type`") == -1) {
            db.executeQuery("ALTER TABLE projects ADD COLUMN `connection_type` TEXT NOT NULL DEFAULT 'direct'");
            db.executeQuery("ALTER TABLE projects ADD COLUMN `ssh_host` TEXT");
            db.executeQuery("ALTER TABLE projects ADD COLUMN `ssh_port` INTEGER");
            db.executeQuery("ALTER TABLE projects ADD COLUMN `ssh_user` TEXT");
            db.executeQuery("ALTER TABLE projects ADD COLUMN `ssh_password` TEXT");
          }
        }
      });
    });

    return db;
  }]);;
