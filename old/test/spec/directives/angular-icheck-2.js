'use strict';

describe('Directive: angularIcheck2', function () {

  // load the directive's module
  beforeEach(module('electroCrudApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<angular-icheck-2></angular-icheck-2>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the angularIcheck2 directive');
  }));
});
