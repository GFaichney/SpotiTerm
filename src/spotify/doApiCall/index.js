'use strict';

let getTokens = require('../getTokens');
let cache = require('../getTokens/cache.js');
let getMethod = require('./getMethod.js');
let makeHttpRequest = require('./makeHttpRequest.js');

let doApiCall = async (api) => {
  let method = getMethod.getMethod(api);
  let tokens = cache.read();

  if(!tokens.access_token){
    tokens = await getTokens.getNewTokens();
  }

  try{
    let res = await makeHttpRequest.makeHttpRequest(method, api, tokens.access_token);
    return res;
  }catch(err){
    if(err.status && err.status === 401){
      tokens = await getTokens.getNewTokens();
      return await makeHttpRequest.makeHttpRequest(method, api, tokens.access_token);
    }
  }
}

module.exports = { makeHttpRequest, doApiCall, getMethod };
