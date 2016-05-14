'use strict';

describe('Service: viewsModel', function () {

  // load the service's module
  beforeEach(module('electroCrudApp'));

  // instantiate service
  var viewsModel;
  beforeEach(inject(function (_viewsModel_) {
    viewsModel = _viewsModel_;
  }));

  it('should do something', function () {
    expect(!!viewsModel).toBe(true);
  });

});
