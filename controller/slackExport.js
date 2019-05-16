require('dotenv').config();
var 
    slack = require('@slack/client').WebClient,
    colors = require('colors'),
    jsonfile = require('jsonfile'),
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
    async = require('async'),
    mkdirp = require('mkdirp');;

/**
 * Finds the ID of the channel whose history is being exported, calls getChannelHistory on that channel
 * @param  {string} chanName - The name of the channel whose history is being exported
 */
function exportChannel(teamName, token) {
  
  var channelLookup = {};
  var web = new slack(token);

  // Create a directory in the workplace_data for each separate team name.
  mkdirp('./workplace_data/' + teamName, function(err) { 
    if (err) {
        console.log(err);
    }; 
  });
 
  web.channels.list(function(err, info) {
    if (err) {
      console.log(err);
    } else {
      for (var i in info.channels) {
        console.log(web.channels.list)
        _getChannelHistory(teamName, token, info.channels[i].name, channelLookup[info.channels[i].name], 10000);
      }
    }
  });
};

/**
 * Converts messages in channel history to a JSON object, writes JSON object to a file, and calls convertToHtml on the array of messages
 * @param  {string} chanName - The name of the channel
 * @param  {string} channel - The ID of the channel
 * @param  {Integer} count - The number of messages to export
 */
function _getChannelHistory(teamName, token, chanName, channel, count) {

    // var web = new slack(token);
    console.log('done')
    

  var file = './workplace_data/' + teamName + '/' + chanName + '.json',
      messageArray = [],
      userLookup = [],
      getChannelHistory = function() {
        this.get = function(callback) {
          var xhr = new XMLHttpRequest();
          var url = "https://slack.com/api/channels.history?token=" + token + "&channel=" + channel + "&count=" + count;
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              callback(xhr.responseText);
            }
          }
          xhr.open("GET", url, true);
          xhr.send();
        }
      };

  async.waterfall([
    function(callback) {
      web.users.list(function(err, info) {
        if (err) {
          console.log(err);
        } else {
          for (var i in info.members) {
            userLookup[info.members[i].id] = info.members[i];
          }
          callback(null);
        }
      });
    },
    function(callback) {
      history = new getChannelHistory();
      history.get(function(response) {
        json = JSON.parse(response);
        
        json['messages'].forEach(function(message) {
          messageArray.unshift(message);
          
        });
        jsonfile.writeFile(file, messageArray, {spaces: 2, EOL: '\r\n'}, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Channel: " + chanName + " archieved!".green);
          }
        });
      });
      callback(null, 'done');
    }
  ], function (err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports.exportChannel = exportChannel;
