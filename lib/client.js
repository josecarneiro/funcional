'use strict';

const { version } = require('./../package.json');

const triggerMap = {
  'HTTP_TRIGGER': 'http'
};

const processConfig = {
  environment: process.env.NODE_ENV,
  project: process.env.GCLOUD_PROJECT,
  name: process.env.FUNCTION_NAME,
  directory: process.env.PWD,
  memory: parseInt(process.env.FUNCTION_MEMORY_MB),
  home: process.env.HOME,
  trigger: triggerMap[process.env.FUNCTION_TRIGGER_TYPE] || null
};

module.exports = class FuncionalClient {
  constructor (request, response) {
    this.version = version;
    this._req = request;
    this._res = response;
    this._response = null;
    this._config = processConfig;
  }

  send (string, status = 200) {
    if (this._response) throw new Error('Response has already been sent.');
    if (typeof string !== 'string') throw new Error('Send function requires string.');
    this._res.set('X-Engine', 'funcional');
    this._res.status(status).send(string);
    this._response = { status, sent: string };
  }

  json (data, status) {
    let string;
    if (typeof data !== 'object') throw new Error('Data provided must be an object');
    try {
      string = JSON.stringify(data, null, '');
    } catch (error) {
      throw new Error('Error parsing JSON response');
    }
    this.send(string, status);
  }

  error (error, status = 400) {
    console.log(status, error);
    // TODO:
    // EXTRACT MESSAGE FROM ERROR AND SEND IT?
    this.send('Error.', status);
  }

  get req () {
    return this._req;
  }

  get res () {
    return this._res;
  }

  get config () {
    return this._config;
  }

  get response () {
    return this._response;
  }

  static version () {
    return version;
  }
};
