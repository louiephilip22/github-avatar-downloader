var request = require('request');
var token = require('./secret.js');


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token' + token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  //console.log("Errors:", err);
  var stringed = JSON.parse(result);
  console.log("Result:", stringed);

  // var myUrl = stringed.filter(function(amount) {
  //   return stringed.avatar_url;
  //   console.log("Result:", myUrl);
  //})
  stringed.forEach(function(obj) {
    console.log("Result:" + obj.avatar_url);
  })
});

