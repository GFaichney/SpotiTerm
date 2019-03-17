let generateRandomString = require('./generateRandomString.js');
let querystring = require('querystring');
let opn = require('opn');
let secrets = require('../secrets.js');

let requestPermissions = () => {
  let { client_id } = secrets.load();
  opn('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope: 'user-read-playback-state user-modify-playback-state',
      redirect_uri: 'http://localhost:8888/',
      state: generateRandomString(16)
    }));
};

module.exports = requestPermissions;
