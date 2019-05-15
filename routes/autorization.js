// Authorization route for slack app
'use strict';
var request = require('request');


module.exports = function (app) {
    app.get('/auth', function(req, res){
        if (!req.query.code) { // access denied
          return;
        }
        var data = {form: {
          client_id: process.env.SLACK_CLIENT_ID,
          client_secret: process.env.SLACK_CLIENT_SECRET,
          code: req.query.code
        }};
    
        console.log(data);
    
        request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            // Get an auth token
            let oauthToken = JSON.parse(body).access_token;
            console.log(oauthToken);
            // OAuth done- redirect the user to wherever
            res.redirect("http://www.animo.ventures/");
          }
        })
      });
};


