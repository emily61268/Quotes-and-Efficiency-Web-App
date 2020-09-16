const sinon = require('sinon');
const getPlaceById = require('../../src/get-place-by-id');

const FAKE_RESPONSE = 'RESPONSE';

const getMock = sinon.stub().resolves(FAKE_RESPONSE);
const fetcherMock = { get: getMock };

describe('Spott SDK | .getPlaceById', () => {
  beforeEach(() => {
    getMock.resetHistory();
  });

  it('should throw an error when not sending an id', () => {
    expect(() => getPlaceById(fetcherMock)).to.throw(Error, 'Parameter "id" is required');
  });

  it('should request data with correct parameters (no options)', async () => {
    const id = 'MX';
    const response = await getPlaceById(fetcherMock, id);

    expect(response).to.be.eql(FAKE_RESPONSE);
    expect(getMock.callCount).to.be.equal(1);

    const [params] = getMock.firstCall.args;
    expect(params).to.be.an('object');
    expect(params.path).to.be.equal(`/places/${id}`);
    expect(params.query).to.be.eql({});
  });

  it('should request data with correct parameters and options', async () => {
    const id = 'MX';
    const language = 'es';
    const options = { language };
    const response = await getPlaceById(fetcherMock, id, options);

    expect(response).to.be.eql(FAKE_RESPONSE);
    expect(getMock.callCount).to.be.equal(1);

    const [params] = getMock.firstCall.args;
    expect(params).to.be.an('object');
    expect(params.path).to.be.equal(`/places/${id}`);
    expect(params.query).to.be.eql({ language });
  });
});
