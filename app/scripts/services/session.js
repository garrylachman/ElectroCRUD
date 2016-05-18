'use strict';

/**
 * @ngdoc service
 * @name electroCrudApp.session
 * @description
 * # session
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('session', ['projectsModel', 'viewsModel', function (projectsModel, viewsModel) {
    var currentProject = {};
    var currentViews = [];

    return {
      openProject: function(id) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          projectsModel.getById(id)
            .then(function(result){
              currentProject = result.rows[0];
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
      projectViews: currentViews
    }
  }]);
