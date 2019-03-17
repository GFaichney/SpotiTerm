'use strict';

let expect = require('chai').expect;
let request = require('request');

let { getMethod } = require('../../../src/spotify/doApiCall/getMethod.js');

describe('getMethod', () => {
  it('returns request.get if method = GET', () => {
    let func = getMethod({method: 'GET'});
    expect(func).to.equal(request.get);
  });
  it('returns request.put if method = PUT', () => {
    let func = getMethod({method: 'PUT'});
    expect(func).to.equal(request.put);
  });
  it('returns request.post if method = POST', () => {
    let func = getMethod({method: 'POST'});
    expect(func).to.equal(request.post);
  });
});

