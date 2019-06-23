'use strict';

describe('Controller: MainHeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('electroCrudApp'));

  var MainHeaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainHeaderCtrl = $controller('MainHeaderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MainHeaderCtrl.awesomeThings.length).toBe(3);
  });
});
