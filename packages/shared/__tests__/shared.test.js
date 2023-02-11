'use strict';

const shared = require('..');
const assert = require('assert').strict;

assert.strictEqual(shared(), 'Hello from shared');
console.info("shared tests passed");
