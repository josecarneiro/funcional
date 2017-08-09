'use strict';

/* DEPENDENCIES */
const { expect } = require('chai');
const { Server } = require('./../.');

/* EASY ID TESTS */
describe('Server', () => {
  it('should throw error when creating server with missing options', done => {
    const missingConfigMessage = 'Functional server configuration options missing.';
    expect(() => new Server()).to.throw(Error, missingConfigMessage);
    expect(() => new Server({ project: 'foo' })).to.throw(Error, missingConfigMessage);
    expect(() => new Server({ function: 'foo' })).to.throw(Error, missingConfigMessage);
    expect(new Server({ project: 'foo', function: 'foo' })).to.be.an.instanceof(Server);
    done();
  });
});
