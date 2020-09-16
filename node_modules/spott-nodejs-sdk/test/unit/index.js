const sinon = require('sinon');
const proxyquire = require('proxyquire');

const FETCHER_MOCK = 'FAKE_FETCHER';
const FAKE_RESPONSE = 'RESPONSE'

const searchPlacesMock = sinon.stub().resolves(FAKE_RESPONSE);
const autocompletePlacesMock = sinon.stub().resolves(FAKE_RESPONSE);
const getPlaceByIdMock = sinon.stub().resolves(FAKE_RESPONSE);
const getPlaceByGeonameIdMock = sinon.stub().resolves(FAKE_RESPONSE);
const getPlaceByIpMock = sinon.stub().resolves(FAKE_RESPONSE);
const getPlaceByMyIpMock = sinon.stub().resolves(FAKE_RESPONSE);

describe('Spott SDK | index', () => {
  describe('Validation', () => {
    const SpottSDK = require('../../src');

    it('should create an instance of Spott SDK and expose function', () => {
      const spott = new SpottSDK('API Key');
      expect(spott).to.be.an('object');
    });
  
    it('should throw an error when not sending the API Key', () => {
      expect(() => new SpottSDK()).to.throw(Error, 'A Spott API Key is required');
    });
  });

  describe('Methods', () => {
    const SpottSDK = proxyquire('../../src', {
      './autocomplete-places': autocompletePlacesMock,
      './get-place-by-geoname-id': getPlaceByGeonameIdMock,
      './get-place-by-id': getPlaceByIdMock,
      './get-place-by-ip': getPlaceByIpMock,
      './get-place-by-my-ip': getPlaceByMyIpMock,
      './search-places': searchPlacesMock
    });
    let spott;

    beforeEach(() => {
      spott = new SpottSDK('API Key');
      spott.fetcher = FETCHER_MOCK;
      autocompletePlacesMock.resetHistory();
      getPlaceByGeonameIdMock.resetHistory();
      getPlaceByIdMock.resetHistory();
      getPlaceByIpMock.resetHistory();
      getPlaceByMyIpMock.resetHistory();
      searchPlacesMock.resetHistory();
    });

    it('should implement "autocompletePlaces" method', async () => {
      const query = 'query';
      const options = { foo: 'bar' };
      const response = await spott.autocompletePlaces(query, options);

      expect(response).to.be.eql(FAKE_RESPONSE);
      expect(autocompletePlacesMock.callCount).to.be.equal(1);

      const [actualFetcher, actualQuery, actualOptions] = autocompletePlacesMock.firstCall.args;
      expect(actualFetcher).to.be.eql(FETCHER_MOCK);
      expect(actualQuery).to.be.eql(query);
      expect(actualOptions).to.be.eql(options);
    });

    it('should implement "getPlaceByGeonameId" method', async () => {
      const geonameId = '123465';
      const options = { foo: 'bar' };
      const response = await spott.getPlaceByGeonameId(geonameId, options);

      expect(response).to.be.eql(FAKE_RESPONSE);
      expect(getPlaceByGeonameIdMock.callCount).to.be.equal(1);

      const [actualFetcher, actualGeonameId, actualOptions] = getPlaceByGeonameIdMock.firstCall.args;
      expect(actualFetcher).to.be.eql(FETCHER_MOCK);
      expect(actualGeonameId).to.be.eql(geonameId);
      expect(actualOptions).to.be.eql(options);
    });

    it('should implement "getPlaceById" method', async () => {
      const id = 'MX';
      const options = { foo: 'bar' };
      const response = await spott.getPlaceById(id, options);

      expect(response).to.be.eql(FAKE_RESPONSE);
      expect(getPlaceByIdMock.callCount).to.be.equal(1);

      const [actualFetcher, actualId, actualOptions] = getPlaceByIdMock.firstCall.args;
      expect(actualFetcher).to.be.eql(FETCHER_MOCK);
      expect(actualId).to.be.eql(id);
      expect(actualOptions).to.be.eql(options);
    });

    it('should implement "getPlaceByIp" method', async () => {
      const ip = '1.2.3.4';
      const options = { foo: 'bar' };
      const response = await spott.getPlaceByIp(ip, options);

      expect(response).to.be.eql(FAKE_RESPONSE);
      expect(getPlaceByIpMock.callCount).to.be.equal(1);

      const [actualFetcher, actualIp, actualOptions] = getPlaceByIpMock.firstCall.args;
      expect(actualFetcher).to.be.eql(FETCHER_MOCK);
      expect(actualIp).to.be.eql(ip);
      expect(actualOptions).to.be.eql(options);
    });

    it('should implement "getPlaceByMyIp" method', async () => {
      const options = { foo: 'bar' };
      const response = await spott.getPlaceByMyIp(options);

      expect(response).to.be.eql(FAKE_RESPONSE);
      expect(getPlaceByMyIpMock.callCount).to.be.equal(1);

      const [actualFetcher, actualOptions] = getPlaceByMyIpMock.firstCall.args;
      expect(actualFetcher).to.be.eql(FETCHER_MOCK);
      expect(actualOptions).to.be.eql(options);
    });

    it('should implement "searchPlaces" method', async () => {
      const query = 'query';
      const options = { foo: 'bar' };
      const response = await spott.searchPlaces(query, options);

      expect(response).to.be.eql(FAKE_RESPONSE);
      expect(searchPlacesMock.callCount).to.be.equal(1);

      const [actualFetcher, actualQuery, actualOptions] = searchPlacesMock.firstCall.args;
      expect(actualFetcher).to.be.eql(FETCHER_MOCK);
      expect(actualQuery).to.be.eql(query);
      expect(actualOptions).to.be.eql(options);
    });
  });
});
