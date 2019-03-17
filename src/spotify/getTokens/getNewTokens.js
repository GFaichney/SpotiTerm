let getAPIToken  = require('./getAPIToken.js');
let getAuthCode  = require('../getAuthCode');
let cache = require('./cache.js');
let secrets = require('../secrets.js');


let getNewTokens = async () => {
  let { client_id, client_secret } = secrets.load();
  let authCode = await getAuthCode.getAuthCode();
  let tokenData = await getAPIToken.getAPIToken(authCode, 'http://localhost:8888/', client_id, client_secret);
  let access_token = tokenData.access_token;
  let refresh_token = tokenData.refresh_token;
  cache.write({access_token, refresh_token});
  
  return {
    access_token, refresh_token
  };
};

module.exports = getNewTokens;

