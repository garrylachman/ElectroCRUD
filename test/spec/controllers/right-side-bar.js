'use strict';

describe('Controller: RightSideBarCtrl', function () {

  // load the controller's module
  beforeEach(module('electroCrudApp'));

  var RightSideBarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RightSideBarCtrl = $controller('RightSideBarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RightSideBarCtrl.awesomeThings.length).toBe(3);
  });
});
