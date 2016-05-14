'use strict';

describe('Service: mysql', function () {

  // load the service's module
  beforeEach(module('electroCrudApp'));

  // instantiate service
  var mysql;
  beforeEach(inject(function (_mysql_) {
    mysql = _mysql_;
  }));

  it('should do something', function () {
    expect(!!mysql).toBe(true);
  });

});
