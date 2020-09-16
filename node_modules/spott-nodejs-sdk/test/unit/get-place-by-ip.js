const sinon = require('sinon');
const getPlaceByIp = require('../../src/get-place-by-ip');

const FAKE_RESPONSE = 'RESPONSE';

const getMock = sinon.stub().resolves(FAKE_RESPONSE);
const fetcherMock = { get: getMock };

describe('Spott SDK | .getPlaceByIp', () => {
  beforeEach(() => {
    getMock.resetHistory();
  });

  it('should throw an error when not sending an ip', () => {
    expect(() => getPlaceByIp(fetcherMock)).to.throw(Error, 'Parameter "ip" is required');
  });

  it('should request data with correct parameters (no options)', async () => {
    const ip = '1.2.3.4';
    const response = await getPlaceByIp(fetcherMock, ip);

    expect(response).to.be.eql(FAKE_RESPONSE);
    expect(getMock.callCount).to.be.equal(1);

    const [params] = getMock.firstCall.args;
    expect(params).to.be.an('object');
    expect(params.path).to.be.equal(`/places/ip/${ip}`);
    expect(params.query).to.be.eql({});
  });

  it('should request data with correct parameters and options', async () => {
    const ip = '1.2.3.4';
    const language = 'es';
    const options = { language };
    const response = await getPlaceByIp(fetcherMock, ip, options);

    expect(response).to.be.eql(FAKE_RESPONSE);
    expect(getMock.callCount).to.be.equal(1);

    const [params] = getMock.firstCall.args;
    expect(params).to.be.an('object');
    expect(params.path).to.be.equal(`/places/ip/${ip}`);
    expect(params.query).to.be.eql({ language });
  });
});
