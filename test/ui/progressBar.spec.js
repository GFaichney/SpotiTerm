'use strict';

let expect = require('chai').expect;
let progressBar = require('../../src/ui/progressBar');
let UIError = require('../../src/ui/UIError.js');

describe('progressBar', () => {
  it('Throws an error if given less than 10 characters in which to render', () => {
    try{
      let result = progressBar(9, 100,50);
      expect(true).to.equal(false);
    }catch(err){
      expect(err).to.be.an.instanceof(UIError);
    }
  });
  it('throws a UIError containing the position and maxValue if the given position is greater than the given maxValue', () => {
    try{
      let result = progressBar(19, 50, 100);
      expect(true).to.equal(false);
    }catch(err){
      expect(err).to.be.an.instanceof(UIError);
    }
  });
  it('returns a string 10 characters long when given a screen length of 10', () => {
    let result = progressBar(10, 50, 50);
    expect(result.length).to.equal(10);
  });
  it('returns a string starting with [ and ending with ] when given valid values', () => {
    let result = progressBar(10, 50, 50);
    expect(result.startsWith('[')).to.be.true;
    expect(result.endsWith(']')).to.be.true;
  });
  it('returns a string of [########] when passed a length of 10 and the position and maxValue match', () => {
    let result = progressBar(10, 50, 50);
    expect(result).to.equal('[########]');
  });
  it('returns a string of [####    ] when passed a length of 10 and the position is exactly half the max value', () => {
    let result = progressBar(10, 50, 25);
    expect(result).to.equal('[####    ]');
  });
});
