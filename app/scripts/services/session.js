'use strict';

/**
 * @ngdoc service
 * @name electroCrudApp.session
 * @description
 * # session
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('session', ['projectsmodel', function (projectsmodel) {
    var currentProject = {};

    return {
      openProject: function(id) {
        projectsModel.getById(projectId).then(function(result){
          currentProject = result.rows[0];
        });
      }
    }
  }]);
