'use strict';

/**
 * @ngdoc service
 * @name electroCrudApp.viewsModel
 * @description
 * # viewsModel
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .service('viewsModel', ['db', function(db){
    var table = "views";

    return {
      getList: function(project_id) {
        return db.select(table, { project_id: project_id });
      },
      getById: function(id) {
        return db.select(table, { id: id });
      },
      add: function(name, project_id, view_type, schema) {
        return db.insert(table, {
          name: name,
          project_id: project_id,
          view_type: view_type,
          schema: schema
        });
      },
      update: function(id, data) {
        delete data.id;
        return db.update(table, data, {
          id: id
        });
      }
    };
  }]);
