'use strict';

describe('Service: dataHelper', function () {

  // load the service's module
  beforeEach(module('electroCrudApp'));

  // instantiate service
  var dataHelper;
  beforeEach(inject(function (_dataHelper_) {
    dataHelper = _dataHelper_;
  }));

  it('should do something', function () {
    expect(!!dataHelper).toBe(true);
  });

});
