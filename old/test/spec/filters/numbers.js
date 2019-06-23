'use strict';

describe('Filter: numbers', function () {

  // load the filter's module
  beforeEach(module('electroCrudApp'));

  // initialize a new instance of the filter before each test
  var numbers;
  beforeEach(inject(function ($filter) {
    numbers = $filter('numbers');
  }));

  it('should return the input prefixed with "numbers filter:"', function () {
    var text = 'angularjs';
    expect(numbers(text)).toBe('numbers filter: ' + text);
  });

});
