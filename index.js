require('dotenv').config() 
var express = require('express')
var request = require('request')
var app = express();


// Set a port number to run the server on. 
const port = process.env.PORT || 3000;
// Start the server  
app.listen(port, () => console.log(`Slack server running on port: ${port}!`));

