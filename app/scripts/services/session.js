'use strict';

/**
 * @ngdoc service
 * @name electroCrudApp.session
 * @description
 * # session
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('session', ['projectsModel', 'viewsModel', 'mysql', function (projectsModel, viewsModel, mysql) {
    var currentProject = undefined;
    var currentViews = [];
    var dbConnection = undefined;

    return {
      openProject: function(id) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          projectsModel.getById(id)
            .then(function(result){
              currentProject = result.rows[0];
              dbConnection = mysql.getConnection(currentProject.mysql_host,
                currentProject.mysql_port,
                currentProject.mysql_user,
                currentProject.mysql_password,
                currentProject.mysql_db);
              dbConnection.connect();
              _this.loadViews();
              resolve();
            })
            .catch(function(err){
              reject(err);
            });
        });
      },
      loadViews: function() {
        viewsModel.getList(currentProject.id).then(function(result){
          angular.copy(result.rows, currentViews);
        });
      },
      getProjectId: function(){
        return currentProject.id;
      },
      getProject: function(){
        return currentProject;
      },
      setConnection: function(connection) {
        dbConnection = connection;
      },
      getConnection: function(){
        return dbConnection;
      },
      projectViews: currentViews
    }
  }]);
