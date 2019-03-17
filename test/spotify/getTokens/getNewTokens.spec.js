'use strict';

let expect = require('chai').expect;
let sinon = require('sinon');

let getAPIToken = require('../../../src/spotify/getTokens/getAPIToken.js');
let getNewTokens = require('../../../src/spotify/getTokens/getNewTokens.js');
let getAuthCode = require('../../../src/spotify/getAuthCode');
let cache = require('../../../src/spotify/getTokens/cache.js');
let secrets = require('../../../src/spotify/secrets.js');

describe('getNewTokens', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(secrets, 'load').returns({client_id: 'abc', client_secret: 'iop'});
  });

  let dummyResponse = {
    access_token: 'abc',
    refresh_token: 'cde'
  };

  it('returns an object containing the access_token and refreshtoken returned from getAPIToken', () => {
    let stub = sandbox.stub(getAPIToken, 'getAPIToken').returns(dummyResponse);
    let data = getAPIToken.getAPIToken('authcode');
    expect(data).to.deep.equal({access_token: 'abc', refresh_token: 'cde'});
  });

  it('passes the authCode parameter through to getAPIToken', () => {
    let stub = sandbox.stub(getAPIToken, 'getAPIToken').returns(dummyResponse);
    let data = getAPIToken.getAPIToken('authcode');
    expect(stub.args[0][0]).to.equal('authcode');
  });

  it('calls getAuthCode and getAPIToken then saves the results with cache.write', async () => {
    let getAuthCodeStub = sandbox.stub(getAuthCode, 'getAuthCode');
    let getAPITokenStub = sandbox.stub(getAPIToken, 'getAPIToken').returns(dummyResponse);
    let cacheWriteStub = sandbox.stub(cache, 'write');

    await getNewTokens();

    expect(getAuthCodeStub.calledOnce).to.be.true;
    expect(getAPITokenStub.calledOnce).to.be.true;
    expect(cacheWriteStub.calledOnce).to.be.true;
  });

  it('calls cache write with access_token and refresh_token returned from getAPIToken', async () => {
    let getAuthCodeStub = sandbox.stub(getAuthCode, 'getAuthCode');
    let getAPITokenStub = sandbox.stub(getAPIToken, 'getAPIToken').returns(dummyResponse);
    let cacheWriteStub = sandbox.stub(cache, 'write');

    await getNewTokens();

    expect(cacheWriteStub.args[0][0]).to.deep.equal(dummyResponse);
  });

  afterEach(function () {
    sandbox.restore();
  });
});

