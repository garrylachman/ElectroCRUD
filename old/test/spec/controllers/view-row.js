'use strict';

describe('Controller: ViewRowCtrl', function () {

  // load the controller's module
  beforeEach(module('electroCrudApp'));

  var ViewRowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewRowCtrl = $controller('ViewRowCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewRowCtrl.awesomeThings.length).toBe(3);
  });
});
