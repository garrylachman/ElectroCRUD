'use strict';

describe('Service: projectsModel', function () {

  // load the service's module
  beforeEach(module('electroCrudApp'));

  // instantiate service
  var projectsModel;
  beforeEach(inject(function (_projectsModel_) {
    projectsModel = _projectsModel_;
  }));

  it('should do something', function () {
    expect(!!projectsModel).toBe(true);
  });

});
