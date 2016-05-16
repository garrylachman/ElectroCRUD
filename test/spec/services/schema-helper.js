'use strict';

describe('Service: schemaHelper', function () {

  // load the service's module
  beforeEach(module('electroCrudApp'));

  // instantiate service
  var schemaHelper;
  beforeEach(inject(function (_schemaHelper_) {
    schemaHelper = _schemaHelper_;
  }));

  it('should do something', function () {
    expect(!!schemaHelper).toBe(true);
  });

});
