'use strict';    

let cache = require('./cache.js');
let getNewTokens = require('./getNewTokens.js');

let getTokens = async authCode => {
  let tokens = cache.read();

  if(tokens.access_token){
    return tokens;
  }

  let requestTime = Date.now();
  tokens = getNewTokens(authCode);
  tokens.time = requestTime;
  cache.write(tokens);

  return tokens;
};

module.exports = { getNewTokens, cache };
