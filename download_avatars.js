var request = require('request');
var token = require('./secret.js');
var fs = require('fs');


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

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  if (!process.argv[2] || !process.argv[3]) {
  console.log('Error');
} else {
  var stringed = JSON.parse(result);
  stringed.forEach(function(obj) {
    downloadImageByURL(obj.avatar_url, obj.id);
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url, filePath)
  .on('error', function(err) {
    throw err;
  })
  .on('response', function (response) {
    console.log('Response Status Code: ', response.statusCode);
  })
  .pipe(fs.createWriteStream(filePath + '.jpg'));
  }
})