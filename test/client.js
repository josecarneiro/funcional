'use strict';

/* DEPENDENCIES */
const { expect } = require('chai');
const { Client } = require('./../.');
const { Req, Res } = require('./mock/req-res');

/* EASY ID TESTS */
describe('Client', () => {
  it('initiate client and send simple response', done => {
    const client = new Client(new Req(), new Res());
    expect(client.version).to.equal(require('./../package.json').version);
    const data = { url: 'https://google.com' };
    const status = 202;
    client.json(data, status);
    expect(client.response.sent).to.equal(JSON.stringify(data, null, ''));
    expect(client.response.status).to.equal(status);
    done();
  });

  it('throw error when trying to responde twice', done => {
    const client = new Client(new Req({ content: 'content' }), new Res());
    client.json({ url: 'https://google.com' }, 202);
    expect(() => client.json({})).to.throw(Error, 'Response has already been sent.');
    done();
  });
});
