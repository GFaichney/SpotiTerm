'use strict';


let expect = require('chai').expect;
let sinon = require('sinon');

let fs = require('fs');

let cache = require('../../../src/spotify/getTokens/cache.js');

describe('cache', () => {

  let sandbox;

  describe('read', () => {
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    it('returns a parsed JSON object from the read-in file', () => {
      sandbox.stub(fs, 'existsSync').returns(true);
      sandbox.stub(fs, 'readFileSync').returns('{"access_token": "abc", "refresh_token": "cde"}');
      let data = cache.read();
      expect(data).to.deep.equal({access_token: 'abc', refresh_token: 'cde'});
    });
    it('returns an empty object if existsSync indicates file doesn`t exist', () => {
      sandbox.stub(fs, 'existsSync').returns(false);
      sandbox.stub(fs, 'readFileSync').returns('{"access_token": "abc", "refresh_token": "cde"}');
      let data = cache.read();
      expect(data).to.deep.equal({});
    });

    afterEach(function () {
      sandbox.restore();
    });
  });

  describe('write', () => {
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    it('writes a JSON string to file', () => {
      let stub = sandbox.stub(fs, 'writeFileSync');
      cache.write({access_token: 'abc', refresh_token: 'cde'});
      expect(stub.args[0][1]).to.equal('{"access_token":"abc","refresh_token":"cde"}');
    });
    
    afterEach(function () {
      sandbox.restore();
    });
  });

  describe('invalidate', () => {
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    it('calls cache write with an empty object', () => {
      let stub = sandbox.stub(fs, 'writeFileSync');
      cache.invalidate();
      expect(stub.args[0][1]).to.equal('{}');
    });
    
    afterEach(() => {
      sandbox.restore();
    });
  });

});
