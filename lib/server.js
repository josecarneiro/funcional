'use strict';

const request = require('request-promise-native');

const version = require('./../package.json').version;

module.exports = class FunctionalServer {
  constructor (options) {
    this._version = version;
    this._defaults = {
      region: 'us-central1'
    };
    this._options = Object.assign(this._defaults, options);
    this._validateOptions();
  }

  send (data, options = {}) {
    const { method = 'post' } = options;
    return new Promise((resolve, reject) => {
      request.post({
        url: `https://${this._options.region}-${this._options.project}.cloudfunctions.net/${this._options.function}`,
        form: data,
        resolveWithFullResponse: true
      })
      .then(response => {
        if (response.statusCode >= 300) return Promise.reject(new Error(response.body));
        let object = JSON.parse(response.body);
        resolve(object);
      })
      .catch(error => {
        let message;
        if (error.statusCode === 404) message = 'Function not found.';
        if (error instanceof SyntaxError) message = 'Error parsing json response.';
        if (error.code === 'ECONNREFUSED') message = 'There was an error reaching the service.';
        reject(Object.assign(new Error(message || 'Unknown error.'), { error }));
      });
    });
  }

  get (data, options) {
    return this.send(data, Object.assign(options, { method: 'get' }));
  }

  
  post (data, options) {
    return this.send(data, Object.assign(options, { method: 'post' }));
  }

  _validateOptions () {
    const options = this._options;
    if (
      !options.project ||
      typeof options.project !== 'string' ||
      options.project.length < 1 ||
      !options.function ||
      typeof options.function !== 'string' ||
      options.function.length < 1
    ) {
      throw new Error('Functional server configuration options missing.');
    }
  }

  get version () {
    return this._version;
  }
};
