'use strict';

describe('Controller: SetupviewCtrl', function () {

  // load the controller's module
  beforeEach(module('electroCrudApp'));

  var SetupviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SetupviewCtrl = $controller('SetupviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SetupviewCtrl.awesomeThings.length).toBe(3);
  });
});
