'use strict';

describe('Controller: ViewAddEditCtrl', function () {

  // load the controller's module
  beforeEach(module('electroCrudApp'));

  var ViewAddEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewAddEditCtrl = $controller('ViewAddEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewAddEditCtrl.awesomeThings.length).toBe(3);
  });
});
