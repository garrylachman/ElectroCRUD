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
    var currentProject = {};
    var currentViews = [];
    var currentViewFilters = [];
    var dbConnection = undefined;

    return {
      openProject: function(id) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          projectsModel.getById(id)
            .then(function(result){
              //currentProject = result.rows[0];
              angular.copy(result.rows[0], currentProject);
              mysql.getConnection(currentProject)
                .then(function(connection){
                  dbConnection = connection;
                  dbConnection.connect(function(err){
                    if (err) reject(err);
                    _this.loadViews();
                    resolve();
                  });
                })
                .catch(function(err){
                  reject();
                });
            })
            .catch(function(err){
              reject(err);
            });
        });
      },
      loadViews: function() {
        viewsModel.getList(currentProject.id)
          .then(function(result){
            angular.copy(result.rows, currentViews);
          });
      },
      setViewFilters: function(_filters){
        angular.copy(_filters, currentViewFilters);
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
      projectViews: currentViews,
      activeProject: currentProject,
      activeViewFilters: currentViewFilters
    }
  }]);
