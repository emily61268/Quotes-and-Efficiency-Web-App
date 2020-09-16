const sinon = require('sinon');
const getPlaceByMyIp = require('../../src/get-place-by-my-ip');

const FAKE_RESPONSE = 'RESPONSE';

const getMock = sinon.stub().resolves(FAKE_RESPONSE);
const fetcherMock = { get: getMock };

describe('Spott SDK | .getPlaceByMyIp', () => {
  beforeEach(() => {
    getMock.resetHistory();
  });

  it('should request data with correct parameters (no options)', async () => {
    const response = await getPlaceByMyIp(fetcherMock);

    expect(response).to.be.eql(FAKE_RESPONSE);
    expect(getMock.callCount).to.be.equal(1);

    const [params] = getMock.firstCall.args;
    expect(params).to.be.an('object');
    expect(params.path).to.be.equal('/places/ip/me');
    expect(params.query).to.be.eql({});
  });

  it('should request data with correct parameters and options', async () => {
    const language = 'es';
    const options = { language };
    const response = await getPlaceByMyIp(fetcherMock, options);

    expect(response).to.be.eql(FAKE_RESPONSE);
    expect(getMock.callCount).to.be.equal(1);

    const [params] = getMock.firstCall.args;
    expect(params).to.be.an('object');
    expect(params.path).to.be.equal('/places/ip/me');
    expect(params.query).to.be.eql({ language });
  });
});
