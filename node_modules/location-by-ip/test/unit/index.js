const sinon = require('sinon');
const proxyquire = require('proxyquire');

const FETCHER_MOCK = 'FAKE_FETCHER';
const FAKE_RESPONSE = 'RESPONSE'
const FAKE_API_KEY = 'API-KEY';

const constructorMock = sinon.spy();
const getPlaceByIpMock = sinon.stub();
const getPlaceByMyIpMock = sinon.stub().resolves(FAKE_RESPONSE);

class SpottSdkMock {
  constructor(...args) {
    constructorMock(...args)
  }

  getPlaceByIp(...args) {
    return getPlaceByIpMock(...args)
  }

  getPlaceByMyIp(...args) {
    return getPlaceByMyIpMock(...args)
  }
}

describe('LocationByIp | index', () => {
  describe('Validation', () => {
    const GetLocation = require('../../src');

    it('should create an instance of GetLocation and expose function', () => {
      const getLocation = new GetLocation('API Key');
      expect(getLocation).to.be.an('object');
    });
  
    it('should throw an error when not sending the API Key', () => {
      expect(() => new GetLocation()).to.throw(Error, 'A Spott API Key is required');
    });
  });

  describe('Methods', () => {
    const GetLocation = proxyquire('../../src', {
      'spott-nodejs-sdk': SpottSdkMock
    });

    beforeEach(() => {
      constructorMock.resetHistory();
      getPlaceByIpMock.resetHistory();
      getPlaceByMyIpMock.resetHistory();
    });

    describe('constructor', () => {
      it('should initiate SpottSDK correctly', async () => {
        new GetLocation(FAKE_API_KEY);
        expect(constructorMock.callCount).to.be.equal(1);
  
        const [actualApiKey] = constructorMock.firstCall.args;
        expect(actualApiKey).to.be.eql(FAKE_API_KEY);
      });
    });

    describe('.byIp', () => {
      it('should implement "byIp" method', async () => {
        getPlaceByIpMock.resolves(FAKE_RESPONSE);

        const getLocation = new GetLocation(FAKE_API_KEY);
        const ip = '1.2.3.4';
        const options = { foo: 'bar' };
        const response = await getLocation.byIp(ip, options);
  
        expect(response).to.be.eql(FAKE_RESPONSE);
        expect(getPlaceByIpMock.callCount).to.be.equal(1);
  
        const [actualIp, actualOptions] = getPlaceByIpMock.firstCall.args;
        expect(actualIp).to.be.eql(ip);
        expect(actualOptions).to.be.eql(options);
      });

      it('should return null when sdk returns 404', async () => {
        const error = new Error();
        error.response = { status: 404 };
        getPlaceByIpMock.rejects(error);

        const getLocation = new GetLocation(FAKE_API_KEY);
        const ip = '1.2.3.4';
        const options = { foo: 'bar' };
        const response = await getLocation.byIp(ip, options);
  
        expect(response).to.be.eql(null);
      });
    });

    describe('.byMyIp', () => {
      it('should implement "byMyIp" method', async () => {
        getPlaceByMyIpMock.resolves(FAKE_RESPONSE);

        const getLocation = new GetLocation(FAKE_API_KEY);
        const options = { foo: 'bar' };
        const response = await getLocation.byMyIp(options);
  
        expect(response).to.be.eql(FAKE_RESPONSE);
        expect(getPlaceByMyIpMock.callCount).to.be.equal(1);
  
        const [actualOptions] = getPlaceByMyIpMock.firstCall.args;
        expect(actualOptions).to.be.eql(options);
      });

      it('should return null when sdk returns 404', async () => {
        const error = new Error();
        error.response = { status: 404 };
        getPlaceByMyIpMock.rejects(error);

        const getLocation = new GetLocation(FAKE_API_KEY);
        const options = { foo: 'bar' };
        const response = await getLocation.byMyIp(options);
  
        expect(response).to.be.eql(null);
      });
    });
  });
});
