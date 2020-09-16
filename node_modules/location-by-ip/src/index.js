const assert = require('assert');
const SpottSDK = require('spott-nodejs-sdk')

class GetLocation {
  constructor(spottApiKey) {
    assert(spottApiKey, 'A Spott API Key is required');
    this.spott = new SpottSDK(spottApiKey);
  }

  byIp(...args) {
    return this.spott.getPlaceByIp(...args)
      .catch(handleError);
  }

  byMyIp(...args) {
    return this.spott.getPlaceByMyIp(...args)
      .catch(handleError);
  }
};

function handleError(error) {
  const NOT_FOUND_STATUS = 404;
  const {status} = (error || {}).response || {};

  if (status === NOT_FOUND_STATUS) return Promise.resolve(null);
  return Promise.reject(error);
}

module.exports = GetLocation;
