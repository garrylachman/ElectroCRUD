'use strict';

describe('Controller: BreadcrumbsCtrl', function () {

  // load the controller's module
  beforeEach(module('electroCrudApp'));

  var BreadcrumbsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BreadcrumbsCtrl = $controller('BreadcrumbsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BreadcrumbsCtrl.awesomeThings.length).toBe(3);
  });
});
