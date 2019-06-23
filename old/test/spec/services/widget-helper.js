'use strict';

describe('Service: widgetHelper', function () {

  // load the service's module
  beforeEach(module('electroCrudApp'));

  // instantiate service
  var widgetHelper;
  beforeEach(inject(function (_widgetHelper_) {
    widgetHelper = _widgetHelper_;
  }));

  it('should do something', function () {
    expect(!!widgetHelper).toBe(true);
  });

});
