'use strict';

describe('Service: session', function () {

  // load the service's module
  beforeEach(module('electroCrudApp'));

  // instantiate service
  var session;
  beforeEach(inject(function (_session_) {
    session = _session_;
  }));

  it('should do something', function () {
    expect(!!session).toBe(true);
  });

});
