'use strict';

describe('Controller: ViewCtrl', function () {

  // load the controller's module
  beforeEach(module('electroCrudApp'));

  var ViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewCtrl = $controller('ViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewCtrl.awesomeThings.length).toBe(3);
  });
});
