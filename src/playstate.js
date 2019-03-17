const client_id = '5a244bda58b546a3b8494a6362f714ec';
const client_secret = '8b5ced2716c94d6092cc46dfda6af84d';

let fs = require('fs');

let { EventLoop, screen, events } = require('term_app');
let getAuthCode = require('./spotify/getAuthCode');
let getAPIToken = require('./spotify/getAPIToken.js');
let { doApiCall } = require('./spotify/doApiCall.js');
let api = require('./spotify/api');
let { getRequiredAuths } = require('./spotify/getRequiredAuths.js');
let ui = require('./ui');
let { trackInfo } = require('./spotify/mapper');

let access_token, refresh_token;

let startup = async () => {
  try{
    let code = await getAuthCode();
    let tokenData = await getAPIToken(code, 'http://localhost:8888/', client_id, client_secret);
    console.log(JSON.stringify(tokenData, null, 2));
        access_token = tokenData.access_token;
    
       let playing = await doApiCall(api.currentlyPlaying(), access_token);
        console.log(JSON.stringify(playing.item.artists, null, 2));
    //
    //    console.log(trackInfo(playing));
    process.exit(0);
  }catch(err){
    console.error(err);
  }
};

//startup();

console.log(JSON.stringify(fs.fstatSync('cache.json'), null, 2));


