const Fetcher = require('./fetcher');
const autocompletePlaces = require('./autocomplete-places');
const getPlaceByGeonameId = require('./get-place-by-geoname-id');
const getPlaceById = require('./get-place-by-id');
const getPlaceByIp = require('./get-place-by-ip');
const getPlaceByMyIp = require('./get-place-by-my-ip');
const searchPlaces = require('./search-places');

class SpottSDK {
  constructor(apiKey) {
    this.fetcher = new Fetcher(apiKey);
  }

  autocompletePlaces(...args) {
    return autocompletePlaces(this.fetcher, ...args);
  }

  getPlaceByGeonameId(...args) {
    return getPlaceByGeonameId(this.fetcher, ...args);
  }

  getPlaceById(...args) {
    return getPlaceById(this.fetcher, ...args);
  }

  getPlaceByIp(...args) {
    return getPlaceByIp(this.fetcher, ...args);
  }

  getPlaceByMyIp(...args) {
    return getPlaceByMyIp(this.fetcher, ...args);
  }

  searchPlaces(...args) {
    return searchPlaces(this.fetcher, ...args);
  }
}

module.exports = SpottSDK;
