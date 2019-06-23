'use strict';

describe('Controller: SidemenuCtrl', function () {

  // load the controller's module
  beforeEach(module('electroCrudApp'));

  var SidemenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SidemenuCtrl = $controller('SidemenuCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SidemenuCtrl.awesomeThings.length).toBe(3);
  });
});
