// Authorization route for slack app
'use strict';
var request = require('request');
require('dotenv').config(); 
const fs = require('fs');

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
            let oauthName = JSON.parse(body).team_name;
            let oauthTokenStr = JSON.stringify(JSON.parse(body));

            // const fd = fs.closeSync(fs.openSync("./user_keys/" + oauthName + ".json", 'w')); "../user_keys/" + 
            fs.writeFile('./user_keys/' + oauthName + ".json", oauthTokenStr, 'utf8', function (err) {
              if (err) {
                  console.log("An error occured while writing JSON Object to File.");
                  return console.log(err);
              }
           
              console.log("Client keys saved!");
              });
            console.log(JSON.parse(body));
            // OAuth done- redirect the user to wherever
            res.redirect("http://www.animo.ventures/");
          }
        })
      });
};


