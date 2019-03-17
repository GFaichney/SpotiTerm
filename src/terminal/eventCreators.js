'use strict';

let events = require('./events.js');

let generateSigwinch = () => {
  return {
    name: events.RESIZE,
    cols: process.stdout.columns,
    rows: process.stdout.rows
  };
};

let generateKeypress = key => {
  return {
    name: events.KEY,
    key: key
  };
}

module.exports = { generateSigwinch, generateKeypress };
