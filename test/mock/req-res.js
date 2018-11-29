'use strict';

const debug = (...args) => {
  if (!process.env.DEBUG) return;
  console.log(...args);
};

class Res {
  constructor () {
    this._status = null;
    this._headers = {};
  }

  set (name, value) {
    this._headers[name] = value;
  }

  status (status) {
    this._status = status;
    return this;
  }

  send (data) {
    if (this._data) throw new Error('Response had already been sent.');
    this._data = data;
    debug('Response sent:\n', { status: this._status, data: this._data });
    return this;
  }
}

class Req {
  constructor (body) {
    this._body = body || {};
  }

  get body () {
    return this._body;
  }
}

module.exports = {
  Req,
  Res,
  req: new Req(),
  res: new Res()
};
