const sinon = require('sinon');
const getPlaceByGeonameId = require('../../src/get-place-by-geoname-id');

const FAKE_RESPONSE = 'RESPONSE';

const getMock = sinon.stub().resolves(FAKE_RESPONSE);
const fetcherMock = { get: getMock };

describe('Spott SDK | .getPlaceByGeonameId', () => {
  beforeEach(() => {
    getMock.resetHistory();
  });

  it('should throw an error when not sending a geoname id', () => {
    expect(() => getPlaceByGeonameId(fetcherMock)).to.throw(Error, 'Parameter "geonameId" is required');
  });

  it('should request data with correct parameters (no options)', async () => {
    const geonameId = '123456';
    const response = await getPlaceByGeonameId(fetcherMock, geonameId);

    expect(response).to.be.eql(FAKE_RESPONSE);
    expect(getMock.callCount).to.be.equal(1);

    const [params] = getMock.firstCall.args;
    expect(params).to.be.an('object');
    expect(params.path).to.be.equal(`/places/geoname-id/${geonameId}`);
    expect(params.query).to.be.eql({});
  });

  it('should request data with correct parameters and options', async () => {
    const geonameId = '123456';
    const language = 'es';
    const options = { language };
    const response = await getPlaceByGeonameId(fetcherMock, geonameId, options);

    expect(response).to.be.eql(FAKE_RESPONSE);
    expect(getMock.callCount).to.be.equal(1);

    const [params] = getMock.firstCall.args;
    expect(params).to.be.an('object');
    expect(params.path).to.be.equal(`/places/geoname-id/${geonameId}`);
    expect(params.query).to.be.eql({ language });
  });
});
