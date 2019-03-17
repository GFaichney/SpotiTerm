let express = require('express');
let requestPermissions = require('./requestPermissions.js');

let server;

let getAuthCode = port => {
  return new Promise((resolve, reject) => {
    let app = express();
    app.get('/', async (req,res) => {
      let code = req.query.code;
      res.send('Done. Please close this window.');
      server.close();
      // TODO: fail on some timeout?
      if(code){
        resolve(code);
      } else {
        reject('No code');
      }
    });

    server = app.listen(8888);
    requestPermissions();  
  });
}




module.exports = { getAuthCode };

