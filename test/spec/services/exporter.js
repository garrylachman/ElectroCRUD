'use strict';

describe('Service: exporter', function () {

  // load the service's module
  beforeEach(module('electroCrudApp'));

  // instantiate service
  var exporter;
  beforeEach(inject(function (_exporter_) {
    exporter = _exporter_;
  }));

  it('should do something', function () {
    expect(!!exporter).toBe(true);
  });

});
