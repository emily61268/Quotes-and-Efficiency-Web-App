const nock = require('nock');
const Fetcher = require('../../src/fetcher');

const FAKE_API_KEY = 'API-KEY';
const SUCCESS_RESPONSE = { success: true };
const HOST_HEADER_NAME = 'x-rapidapi-host';
const HOST_HEADER_VALUE = 'spott.p.rapidapi.com';
const API_KEY_HEADER_NAME = 'x-rapidapi-key';
const BASE_URL = 'https://spott.p.rapidapi.com';

describe('Spott SDK | Fecther', () => {
  after(nock.cleanAll);

  it('should throw an error when not sending an API Key', () => {
    expect(() => new Fetcher()).to.throw(Error, 'A Spott API Key is required');
  });

  it('should build an object when sending API Key correctly', () => {
    const fetcher = new Fetcher(FAKE_API_KEY);
    expect(fetcher).to.be.an('object');
  });

  it('should implement .get method', async () => {
    const fetcher = new Fetcher(FAKE_API_KEY);
    const path = '/places';
    const query = {
      one: 1,
      foo: 'bar',
      true: false
    };

    buildSuccessRequestMock({path, query});

    const params = { path, query };
    const response = await fetcher.get(params);
    expect(response).to.be.an('object');
    expect(response).to.be.eql(SUCCESS_RESPONSE);
  });

  it('should throw error when request is not successful', () => {
    const fetcher = new Fetcher(FAKE_API_KEY);
    const path = '/places';
    const query = {
      one: 1,
      foo: 'bar',
      true: false
    };
    const errorResponse = {
      error: {
        code: 'UNAUTHORIZED',
        message: 'API Key is not authorized.'
      }
    };

    buildFailRequestMock({
      path,
      query,
      code: 401,
      response: errorResponse
    });

    const params = { path, query };

    return fetcher.get(params)
      .then(() => { throw new Error('Promise unexpectedly fulfilled'); })
      .catch(error =>  {
        expect(error).to.be.an('error');

        const {response} = error;
        expect(response.status).to.be.equal(401);
        expect(response.data).to.be.eql(errorResponse);
      });
  });
});

function buildSuccessRequestMock({path, query}) {
  const code = 200;

  nock(BASE_URL)
    .matchHeader(HOST_HEADER_NAME, HOST_HEADER_VALUE)
    .matchHeader(API_KEY_HEADER_NAME, FAKE_API_KEY)
    .get(path)
    .query(query)
    .reply(code, SUCCESS_RESPONSE);
}

function buildFailRequestMock({code, response, path, query}) {
  nock(BASE_URL)
    .get(path)
    .query(query)
    .reply(code, response);
}
