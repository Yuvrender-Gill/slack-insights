
const slackExport = require('../controller/slackExport');
const fs = require('fs');


module.exports = function(app) {
    app.get('/fetchChannel/:id', async function(req, res){

        let teamName = req.params.id

        let workplace = fs.readFileSync('./user_keys/' + teamName +  '.json');
        let oauthToken = JSON.parse(workplace).access_token;
        let teamId = JSON.parse(workplace).team_id;

        res.send(JSON.stringify(JSON.parse(workplace)));
        slackExport.exportChannel(teamId, oauthToken);
    });
};