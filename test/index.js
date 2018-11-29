'use strict';

require('dotenv').config({ path: './test.env' });

describe('funcional library Tests', () => {
  /* REQUIRE TESTS */
  const specs = [ 'client', 'server' ];
  for (let spec of specs) require(`./../lib/${ spec }.spec.js`);
});
