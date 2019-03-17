'use strict';
let UIError = require('./UIError');

let buildTrackInfo = (spacesLeft, itemsToAdd) => {
  if(itemsToAdd.length === 1){
    return '/' + itemsToAdd[0].substring(0, spacesLeft);
  }
  if(itemsToAdd[0].length <= spacesLeft){  
    return buildTrackInfo(spacesLeft - itemsToAdd[0].length, itemsToAdd.slice(1)) + '/' + itemsToAdd[0];
  } else {
    return buildTrackInfo(0, itemsToAdd.slice(1)) + '/' + itemsToAdd[0].substring(0,spacesLeft);
  }
};

let trackInfo = (lengthOnScreen, trackData) => {
  let parts = [];
  let spacesLeft = lengthOnScreen - 3;
  if(lengthOnScreen < 10) {
    throw new UIError('trackInfo needs at least 10 characters to render');
  }

  let trackDisplay = buildTrackInfo(spacesLeft, [trackData.name, trackData.album, trackData.artist]);
  if(lengthOnScreen > trackDisplay.length){
    trackDisplay = trackDisplay + ' '.repeat(lengthOnScreen - trackDisplay.length);
  }
  return trackDisplay;
};

module.exports = trackInfo;
