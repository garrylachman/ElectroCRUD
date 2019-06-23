'use strict';

/**
 * @ngdoc service
 * @name electroCrudApp.projectsModel
 * @description
 * # projectsModel
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('projectsModel', ['db', function(db){
    var table = "projects";

    return {
      getList: function() {
        return db.selectAll(table);
      },
      getById: function(id) {
        return db.select(table, { id: id });
      },
      add: function(name, mysql_host, mysql_port, mysql_user,
        mysql_password, mysql_db, connection_type, ssh_host,
        ssh_user, ssh_password) {
        mysql_password = !mysql_password ? "" : mysql_password;
        mysql_db = !mysql_db ? "" : mysql_db;
        ssh_password = !ssh_password ? "" : ssh_password;
        return db.insert(table, {
          name: name,
          mysql_host: mysql_host,
          mysql_port: mysql_port,
          mysql_user: mysql_user,
          mysql_password: mysql_password,
          mysql_db: mysql_db,
          connection_type: connection_type,
          ssh_host: ssh_host,
          ssh_user: ssh_user,
          ssh_password: ssh_password,
        });
      },
      update: function(id, data) {
        delete data.id;
        data.mysql_password = !data.mysql_password ? "" : data.mysql_password;
        data.mysql_db = !data.mysql_db ? "" : data.mysql_db;
        data.ssh_password = !data.ssh_password ? "" : data.ssh_password;

        return db.update(table, data, {
          id: id
        });
      }
    };
  }]);
