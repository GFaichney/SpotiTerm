'use strict';

let expect = require('chai').expect;
let dedupArray = require('../../src/util/dedupArray.js');

describe('dedupArray', () => {
  it('returns an empty array if passed an empty array', () => {
    let result = dedupArray([]);
    expect(result.length).to.equal(0);
  });
  it('returns a copy of a single-element array if passed a single element array', () => {
    let inArray = ['one'];
    let result = dedupArray(inArray);
    expect(result.length).to.equal(1);
    expect(result).not.to.equal(inArray);
  });
  it('returns a single element array if passed an array with 2 elements that are the same', () => {
    let inArray = ['one','one'];
    let result = dedupArray(inArray);
    expect(result.length).to.equal(1);
    expect(result).to.include('one');
  });
});

