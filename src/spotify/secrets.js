'use strict';

let fs = require('fs');

let load = () => {
  let content = fs.readFileSync('secrets.json');
  return JSON.parse(content);
};

module.exports = { load };
