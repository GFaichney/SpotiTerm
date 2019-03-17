'use strict';

let api = require('./api');
let dedupArray = require('../util/dedupArray.js');

let getRequiredAuths = () => {
  let apis = Object.getOwnPropertyNames(api);
  let requiredScopes = [];
  for(let name of apis) {
    requiredScopes = requiredScopes.concat(api[name]().scopes);
  }

  return dedupArray(requiredScopes);
};

module.exports = { getRequiredAuths };
