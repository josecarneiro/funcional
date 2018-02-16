'use strict';

const version = require('./../package.json').version;

let processConfig = {
  environment: process.env.NODE_ENV,
  project: process.env.GCLOUD_PROJECT,
  name: process.env.FUNCTION_NAME,
  directory: process.env.PWD,
  trigger: null,
  memory: parseInt(process.env.FUNCTION_MEMORY_MB),
  home: process.env.HOME
};

switch (process.env.FUNCTION_TRIGGER_TYPE) {
  case 'HTTP_TRIGGER':
    processConfig.trigger = 'http';
    break;
}

module.exports = class FunctionalClient {
  constructor (request, response) {
    this._version = version;
    this._req = request;
    this._res = response;
    this._response = null;
    this._config = processConfig;
  }

  send (string, status = 200) {
    if (this._response) {
      throw new Error('Response has already been sent.');
    } else if (typeof string !== 'string') {
      throw new Error('Send function requires string.');
    } else {
      this._res.status(status).send(string);
      this._response = { status, sent: string };
    }
  }

  json (data, status) {
    let string;
    if (typeof data !== 'object') {
      throw new Error('Data provided must be an object');
    } else {
      try {
        string = JSON.stringify(data, null, '');
      } catch (error) {
        throw new Error('Error parsing JSON response');
      }
      this.send(string, status);
    }
  }

  error (error, status = 400) {
    console.log(status, error);
    // TODO:
    // EXTRACT MESSAGE FROM ERROR AND SEND IT?
    this.send('Error.', status);
  }
  
  get version () {
    return this._version;
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

  // path = path || '/config/web-scrape.json';
  static loadConfig (config, path) {
    return new Promise((resolve, reject) => {
      const defaults = {
        destination: 'tmp'
      };
      config = Object.assign(defaults, config);

      const bucket = storage.bucket(config.bucket);
      const file = bucket.file(path);

      let filename = path.split('/')[path.split('/').length - 1];
      let destination = `/${config.destination}/${config.filename || filename}`;

      file.download({
        destination
      })
      .then(() => {
        const data = require(`./..${destination}`);
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    })
  }
};
