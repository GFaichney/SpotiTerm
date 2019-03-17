'use strict';

var fs = require('fs');

let cacheFile = 'cache.json';
let charset = 'utf8';

let write = data => {
  var json = JSON.stringify(data);
  fs.writeFileSync(cacheFile, json, charset);
};

let read = () => {
  if(fs.existsSync(cacheFile)){
    let json = fs.readFileSync(cacheFile);
    return JSON.parse(json);
  } else {
    return {};
  }
};

let invalidate = () => {
  write({});
};

module.exports = { read, write, invalidate };
