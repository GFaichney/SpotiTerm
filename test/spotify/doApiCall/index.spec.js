'use strict';

let expect = require('chai').expect;
let doApiCall = require('../../../src/spotify/doApiCall');
let getTokens = require('../../../src/spotify/getTokens');
let getMethod = require('../../../src/spotify/doApiCall/getMethod.js');
let cache = require('../../../src/spotify/getTokens/cache.js');
let makeHttpRequest = require('../../../src/spotify/doApiCall/makeHttpRequest.js');

let sinon = require('sinon');

describe('doApiCall', () => {

  let sandbox;
  let getMethodStub;
  let makeHttpRequestStub;
  let getNewTokensStub;
  let cacheReadStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    getMethodStub = sandbox.stub(getMethod, 'getMethod');
    makeHttpRequestStub = sandbox.stub(makeHttpRequest, 'makeHttpRequest');
    getNewTokensStub = sandbox.stub(getTokens, 'getNewTokens').returns({access_token: 'aaa'});
    cacheReadStub = sandbox.stub(cache, 'read').returns({});
  });

  it('calls getMethod, cache.read, getNewTokens then makeHttpRequest', async () => {
    await doApiCall.doApiCall();

    expect(getMethodStub.calledOnce).to.be.true;
    expect(makeHttpRequestStub.calledOnce).to.be.true;
    expect(getNewTokensStub.calledOnce).to.be.true;
    expect(cacheReadStub.called).to.be.true;
  });

  it('doesn`t call getNewTokens if cache.read returns an access_token', async () => {
    cacheReadStub.returns({access_token: 'abc'});
    await doApiCall.doApiCall('myapi', 'authy');

    expect(getNewTokensStub.called).to.be.false;
  });

  it('calls getMethod with passed in api', async () => {
    await doApiCall.doApiCall('myapi', 'authy');

    expect(getMethodStub.args[0][0]).to.equal('myapi');
  });

  it('calls makeHttpRequest with method from getMethod, api and access_token from getNewTokens', async () => {
    getNewTokensStub.returns({access_token: 'mytoken'});
    await doApiCall.doApiCall('myapi', 'authy');

    expect(makeHttpRequestStub.args[0][2]).to.equal('mytoken');
  });

  it('calls getNewTokens if makeHttpRequest returns a 401 error', async () => {
    cacheReadStub.returns({access_token: 'abc'});
    makeHttpRequestStub.throws({status: 401});
    try{
      await doApiCall.doApiCall('myapi', 'authy');
    }catch(err){
      console.log(`Test error block: ${err}`);
    }
    expect(getNewTokensStub.calledOnce).to.be.true;
  });
  
  it('calls makeHttpRequest a 2nd time if 1st call returns a 401 error', async () => {
    cacheReadStub.returns({access_token: 'abc'});
    makeHttpRequestStub.throws({status: 401});
    try{
      await doApiCall.doApiCall('myapi', 'authy');
    }catch(err){
      console.log(`Test error block: ${err}`);
    }
    expect(makeHttpRequestStub.calledTwice).to.be.true;
  });

  afterEach(() => {
    sandbox.restore();
  });
});
