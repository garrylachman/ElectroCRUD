'use strict';

describe('Controller: AddeditprojectCtrl', function () {

  // load the controller's module
  beforeEach(module('electroCrudApp'));

  var AddeditprojectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddeditprojectCtrl = $controller('AddeditprojectCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddeditprojectCtrl.awesomeThings.length).toBe(3);
  });
});
