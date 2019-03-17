let request = require ('request');


let getAPIToken = (auth_code, redirect, client_id, client_secret) => {
  return new Promise((resolve, reject) => {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: auth_code,
        redirect_uri: redirect,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    return request.post(authOptions, function(error, response, body) {
      if(error){
        return reject(error);
      } else if (body.error) {
        return reject(body);
      } else {
        return resolve(body);
      }
    }
    )
  });
}

module.exports =  { getAPIToken };
