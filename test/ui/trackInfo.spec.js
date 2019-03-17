'use strict';

let expect = require('chai').expect;
let trackInfo = require('../../src/ui/trackInfo');
let UIError = require('../../src/ui/UIError.js');

describe('trackInfo', () => {
  it('Throws an error if given less than 10 characters in which to render', () => {
    try{
      let result = trackInfo(9, {});
      expect(true).to.equal(false);
    }catch(err){
      expect(err).to.be.an.instanceof(UIError);
    }
  });
  it('returns a string containing the full track name if it`s shorter than lengthOnScreen - 3', () => {
    let result = trackInfo(20, { name: 'This is my track', artist: 'Artiste', album: 'Me' });
    expect(result).to.have.string('This is my track');
  });
  it('returns a string containing the full track name if it`s the same length as lengthOnScreen - 3', () => {
    let result = trackInfo(19, { name: 'This is my track', artist: 'Artiste', album: 'Me'});
    expect(result).to.have.string('This is my track');
  });
  it('returns a string containing the first `lengthOnScreen - 3` characters of the track name if the name is longer than lengthOnScreen - 3', () => {
    let result = trackInfo(16, { name: 'Really long track name', artist: 'Artiste', album: 'Me' });
    expect(result).to.equal('///Really long t');
  });
  it('returns a string containing the artist, album and track names separated by / if lengthOnScreen - 3 is large enough', () => {
    let result = trackInfo(20, { name: 'My Song', artist: 'MC Singer', album: 'Me' });
    expect(result).to.equal('/MC Singe/Me/My Song');
  });
  it('returns a string right-padded with spaces to the full lengthOnScreen', () => {
    let result = trackInfo(20, { name: 'Song', artist: 'Singer', album: 'Me' });
    expect(result.length).to.equal(20);
    expect(result).to.equal('/Singer/Me/Song     ');
  });
  it('returns the first lengthOnScreen - 3 characters of track name prepended with // if the track name is longer than lengthOnScreen - 3', () => {
    let result = trackInfo(10, { name: 'Really Long Song Name', artist: 'Artist Name', album: 'Album Name' });
    expect(result.length).to.equal(10);
    expect(result).to.equal('///Really ');
  });
  it('returns the track name plus the first characters of album name if track name length + album name length > lengthOnScreen - 3 and trackName length < lengthOnScreen', () => {
    let result = trackInfo(20, { name: 'Trackname', album: 'My First Album', artist: 'Artist' });
    expect(result).to.equal('//My First/Trackname');
  });
});
