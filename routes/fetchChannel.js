
const slackExport = require('../controller/slackExport');
const fs = require('fs');


module.exports = function(app) {
    app.get('/fetchChannel/:id', async function(req, res){

        let teamName = req.params.id

        console.log(teamName);

        let workplace = fs.readFileSync('./user_keys/' + teamName +  '.json');
        let oauthToken = JSON.parse(workplace).access_token;
        slackExport.exportChannel(teamName, oauthToken);
        console.log(teamName)
        res.send(JSON.stringify(JSON.parse(workplace)));
    });

};