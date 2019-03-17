'use strict';

let expect = require('chai').expect;
let sinon = require('sinon');
let fs = require('fs');

let secrets = require('../../src/spotify/secrets.js');

describe('load', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  it('calls fs.readFileSync passing secrets.json as filename', () => {
    let readStub = sandbox.stub(fs, 'readFileSync').returns('{"client_id": "abc", "client_secret": "iop"}');
    let res = secrets.load();
    expect(readStub.calledOnce).to.be.true;
    expect(readStub.args[0][0]).to.equal('secrets.json');
  });

  it('returns a JSON object version of the string returned from readFileSync', () => {
    let readStub = sandbox.stub(fs, 'readFileSync').returns('{"client_id": "abc", "client_secret": "iop"}');
    let res = secrets.load();
    expect(res.client_id).to.equal('abc');
    expect(res.client_secret).to.equal('iop');
  });

  it('throws an error if the file doesn`t exist', () => {
    let readStub = sandbox.stub(fs, 'readFileSync').throws('file not found');
    try{
      let res = secrets.load();
      expect(true).to.be.false;
    }catch(err){
      console.log(err);
    }
  });

  afterEach(() => {
    sandbox.restore();
  });
});
