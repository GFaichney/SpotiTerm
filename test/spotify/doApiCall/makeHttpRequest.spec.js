'use strict';

let expect = require('chai').expect;
let sinon = require('sinon');
let { buildOptions, makeHttpRequest } = require('../../../src/spotify/doApiCall/makeHttpRequest.js');
let config = require('../../../src/spotify/config.js');

describe('buildOptions', () => {
  it('returns an object with the URL from the parameter', () => {
    let obj = buildOptions({path: '/path/to/api'});
    expect(obj.uri).to.equal(config.base + '/path/to/api');
  });
  it('returns an object containing an Authorization header containing the passed-in auth token', () => {
    let obj = buildOptions({url: 'http://myurl.com/'}, 'mytoken');
    expect(obj.headers.Authorization).to.equal(`Bearer mytoken`);
  });
});
describe('makeHttpRequest', () => {
  it('on successful call, returns a JSON object', async () => {
    let fakeGet = (data, callback) => {
      callback(null, {}, '{"attribute": "value"}');
    };
    let result = await makeHttpRequest(fakeGet, {path: '/my/path'}, 'token');
    expect(result.attribute).to.exist;
  });
  it('if body contains an error key, rejects with body.error as the result', async () => {
    let fakeGet = (data, callback) => {
      callback(null, {}, '{"attribute": "value", "error": "an error"}');
    };
    try{
      let result = await makeHttpRequest(fakeGet, {path: '/my/path'}, 'token');
      expect(true).to.be.false;
    } catch (err) {
      expect(err).to.equal('an error');
    }
  });
  it('if an error is received then rejects with that error', async () => {
    let fakeGet = (data, callback) => {
      callback('another error', {}, '{"attribute": "value", "error": "an error"}');
    };
    try{
      let result = await makeHttpRequest(fakeGet, {path: '/my/path'}, 'token');
      expect(true).to.be.false;
    } catch (err) {
      expect(err).to.equal('another error');
    }
  });
  it('if an empty body is received then return an empty object {}', async () => {
    let fakeGet = (data, callback) => {
      callback(null, {}, null);
    };
    let result = await makeHttpRequest(fakeGet, {path: '/my/path'}, 'token');
    expect(result).to.eql({});
  });
});

