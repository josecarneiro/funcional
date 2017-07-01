'use strict';

require('dotenv').config({ path: './test.env' });

describe('Library Tests', () => {
  /* BEFORE AND AFTER TEST HOOKS */
  before(done => done());
  after(done => done());

  /* REQUIRE TESTS */
  require('./functions');
});
