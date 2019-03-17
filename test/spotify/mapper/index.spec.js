'use strict';

let expect = require('chai').expect;
let { trackInfo } = require('../../../src/spotify/mapper/index.js');
let UIError = require('../../../src/ui/UIError.js');

describe('trackInfo', () => {
  it('populates result with artist field with the artist`s name when only 1 artist given', () => {
    let spotifyData = {
      item: {
        album: {
          name: 'My Album'
        },
        name: 'My Track',
        artists: [
          {
            name: 'My Artist'
          }
        ]
      }
    };

    let res = trackInfo(spotifyData);
    expect(res.artist).to.equal('My Artist');
  });
});
