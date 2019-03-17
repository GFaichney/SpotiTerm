'use strict';
let UIError = require('./UIError');

let progressBar = (lengthOnScreen, maxValue, position) => {
  if(lengthOnScreen < 10) {
    throw new UIError('Progress bar requires at least 10 characters in length');
  }
  if(position > maxValue) {
    throw new UIError('Progress bar position cannot be beyond max value');
  }

  let totalDivisions = lengthOnScreen - 2;
  let usedDivisions = Math.floor(totalDivisions * (position / maxValue));

  return '[' + '#'.repeat(usedDivisions) + ' '.repeat(totalDivisions - usedDivisions) + ']';
};

module.exports = progressBar;
