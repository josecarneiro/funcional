/* DEPENDENCIES */
const expect = require('chai').expect;
const Functional = require('./../.');
const { Req, Res } = require('./mock/req-res');

/* EASY ID TESTS */
describe('Functions', () => {
  it('initiate functional and send simple response', done => {
    const functional = new Functional(new Req(), new Res());
    let data = { url: 'https://google.com' };
    let status = 202;
    functional.json(data, status);
    expect(functional.response.sent).to.equal(JSON.stringify(data, null, ' '));
    expect(functional.response.status).to.equal(status);
    done();
  });
});

describe('Functions', () => {
  it('throw error when trying to responde twice', done => {
    let functional = new Functional(new Req({ content: 'content' }), new Res());
    functional.json({ url: 'https://google.com' }, 202);
    expect(() => functional.json({})).to.throw(Error, 'Response has already been sent.');
    done();
  });
});
