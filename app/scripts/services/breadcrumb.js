'use strict';

/**
 * @ngdoc service
 * @name electroCrudApp.breadcrumb
 * @description
 * # breadcrumb
 * Service in the electroCrudApp.
 */
angular.module('electroCrudApp')
  .factory('breadcrumb', function ($rootScope) {
    var items = [];
    var lastTitle = undefined;

    return {
      clean: function() {
        if (items.length > 0)
          items.splice(0, items.length);
      },
      set: function(pTitle, pHref) {
        this.clean();
        this.append(pTitle, pHref);
      },
      append: function(pTitle, pHref) {
        items.push({
          title: pTitle,
          href: pHref
        });
        lastTitle = pTitle;
      },
      getTitle: function() {
        return lastTitle;
      },
      breadcrumbs: items,
      pageTitle: lastTitle
    }
  });
