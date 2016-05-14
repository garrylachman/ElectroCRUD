'use strict';

describe('Service: breadcrumb', function () {

  // load the service's module
  beforeEach(module('electroCrudApp'));

  // instantiate service
  var breadcrumb;
  beforeEach(inject(function (_breadcrumb_) {
    breadcrumb = _breadcrumb_;
  }));

  it('should do something', function () {
    expect(!!breadcrumb).toBe(true);
  });

});
