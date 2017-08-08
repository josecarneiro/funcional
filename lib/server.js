'use strict';

const request = require('request-promise-native');

const version = require('./../package.json').version;

module.exports = class FunctionalServer {
  constructor (options) {
    this._version = version;
    this._defaults = {};
    this._options = Object.assign(this._defaults, options);
    this._validateOptions();
  }

  send (data) {
    return new Promise((resolve, reject) => {
      request.post({
        url: `https://us-central1-${this._options.project}.cloudfunctions.net/${this._options.function}`,
        form: data,
        resolveWithFullResponse: true
      })
      .then(response => {
        if (response.statusCode >= 300) return Promise.reject(new Error(response.body));
        let object = JSON.parse(response.body);
        resolve(object);
      })
      .catch(error => {
        let object = new Error();
        if (error instanceof SyntaxError) object = Object.assign({ message: 'Error parsing json response.' }, { error });
        if (error.code === 'ECONNREFUSED') object.message = 'There was an error reaching the service.';
        reject(object);
      });
    });
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
      throw new Error('Functional server configuration failed, options missing.');
    }
  }

  get version () {
    return this._version;
  }
};
