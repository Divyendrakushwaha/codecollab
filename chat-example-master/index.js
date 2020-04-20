var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3002;
var fs = require('fs');

const simpleGit = require('simple-git')();
// Shelljs package for running shell tasks optional
const shellJs = require('shelljs');
// Simple Git with Promise for handling success and failure

const simpleGitPromise = require('simple-git/promise')();
function myFunction() {
fs.writeFile('newfile.txt', 'Learn Node FS module', function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
}); 
}

 
// writeFile function with filename, content and callback function


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

shellJs.cd('/');
// Repo name
const repo = 'gitsupporttest';  //Repo name
// User name and password of your GitHub
const userName = 'Divyendrakushwaha';
const password = 'prince03081997';
// Set up GitHub url like this so no manual entry of user pass needed
const gitHubUrl = `https://${userName}:${password}@github.com/${userName}/${repo}`;
// add local git config like username and email

// Add all files for commit
  simpleGitPromise.add('.')
    .then(
       (addSuccess) => {
          console.log(addSuccess);
       }, (failedAdd) => {
          console.log('adding files failed');
    });
// Commit files as Initial Commit
 simpleGitPromise.commit('Intial commit by simplegit')
   .then(
      (successCommit) => {
        console.log(successCommit);
     }, (failed) => {
        console.log('failed commmit');
 });
// Finally push to online repository
 simpleGitPromise.push('origin','master')
    .then((success) => {
       console.log('repo successfully pushed');
    },(failed)=> {
       console.log('repo push failed');
 });

module.exports = app;
