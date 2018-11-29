'use strict';

const request = require('request-promise-native');

const { version } = require('./../package.json');

module.exports = class FuncionalServer {
  constructor (options) {
    this.version = version;
    this._defaults = {
      region: 'us-central1'
    };
    this._options = Object.assign(this._defaults, options);
    this._validateOptions();
  }

  async send (data) {
    const options = this._options;
    try {
      const response = await request.post({
        url: `https://${ options.region }-${ options.project }.cloudfunctions.net/${ options.function }`,
        form: data,
        resolveWithFullResponse: true
      });
      if (response.statusCode >= 300) return Promise.reject(new Error(response.body));
      let object = JSON.parse(response.body);
      return object;
    } catch (error) {
      let message;
      if (error.statusCode === 404) message = 'Function not found.';
      if (error instanceof SyntaxError) message = 'Error parsing json response.';
      if (error.code === 'ECONNREFUSED') message = 'There was an error reaching the service.';
      throw Object.assign(new Error(message || 'Unknown error.'), { error });
    }
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
      throw new Error('funcional server configuration options missing.');
    }
  }

  static version () {
    return version;
  }
};
