const axios = require('axios');
const assert = require('assert');

const HOST_HEADER_NAME = 'x-rapidapi-host';
const HOST_HEADER_VALUE = 'spott.p.rapidapi.com';
const API_KEY_HEADER_NAME = 'x-rapidapi-key';
const BASE_URL = 'https://spott.p.rapidapi.com';

class Fetcher {
  constructor(apiKey) {
    assert(apiKey, 'A Spott API Key is required');
    this.apiKey = apiKey;
  }

  get({path, query}) {
    const headers = getHeaders(this.apiKey);

    const params = {
      headers,
      url: path,
      params: query,
      method: 'get',
      baseURL: BASE_URL
    };

    return axios(params)
      .then(handleSuccessResponse);
  }
}

function getHeaders(apiKey) {
  return {
    [HOST_HEADER_NAME]: HOST_HEADER_VALUE,
    [API_KEY_HEADER_NAME]: apiKey
  };
};

function handleSuccessResponse(response) {
  return response.data;
}

module.exports = Fetcher;
