'use strict';

describe('Service: viewFilterHelper', function () {

  // load the service's module
  beforeEach(module('electroCrudApp'));

  // instantiate service
  var viewFilterHelper;
  beforeEach(inject(function (_viewFilterHelper_) {
    viewFilterHelper = _viewFilterHelper_;
  }));

  it('should do something', function () {
    expect(!!viewFilterHelper).toBe(true);
  });

});
