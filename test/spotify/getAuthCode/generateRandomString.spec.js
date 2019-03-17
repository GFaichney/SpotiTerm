'use strict';

let expect = require('chai').expect;
let generateRandomString = require('../../../src/spotify/getAuthCode/generateRandomString.js');

describe('generateRandomString', () => {
  it('returns a string of 16 characters', () => {
    let str = generateRandomString(16);
    expect(str.length).to.equal(16);
    expect(str).to.match(/^[A-Za-z0-9]{16}/);
  });
  it('returns a string of 1 character', () => {
    let str = generateRandomString(1);
    expect(str.length).to.equal(1);
    expect(str).to.match(/^[A-Za-z0-9]{1}/);
  });
  it('generates a different string each time when called', () => {
    let str1 = generateRandomString(16);
    let str2 = generateRandomString(16);
    let str3 = generateRandomString(16);

    expect(str1).not.to.equal(str2);
    expect(str1).not.to.equal(str3);
    expect(str2).not.to.equal(str3);
  });
});
