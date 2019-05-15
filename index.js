require('dotenv').config() 
var express = require('express')

var app = express();


var authorize = require('.routes/authorization');
// Call the authorize on the express;
authorize(app);


// Set a port number to run the server on. 
const port = process.env.PORT || 3000;
// Start the server  
app.listen(port, () => console.log(`Slack server running on port: ${port}...`));

