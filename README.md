# slack-insights
A simple app to interact with slack. 

Authorizing Slack Access and Downloading Data
1. Go to Slack API's Manage Distribution
2. Share link to Slack provider
3. Authorize while JS and ngrok are running on a server

Running Javascript
1. Open Ubuntu with npm installed and navigate to this directory.
2. Command: npm install 
3. Create .env file in VSCode
4. Command: node index.js # Take note of port
5. Await for Slack authorization. Once it has happened, console will log 'Client keys saved!' and user_keys/team_name.json will save key.
6. Go to 'http://localhost:*port*/fetchChannel/*team_name*'. This will save workplace_data directory with each channel's messages in seperate JSON files. 

Setting up URL redirection
1. Install ngrok
2. Run ngrok.exe
3. Command: ngrok http *port*
4. Ensure https forwarding URL is being redirected to by Slack on Slack API OAuth
5. Ensure Session Status is online when waiting for Slack authorization

Slack API
1. Go to Slack API
2. Go to OAuth & Permissions
3. Copy https forwarding URL from ngrok to 'Add New Redirect URL' and concatenate '/auth' to end
4. Click 'Add' and 'Save URLs'

