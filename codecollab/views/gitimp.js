// Simple-git without promise 
const simpleGit = require('simple-git')();
// Shelljs package for running shell tasks optional
const shellJs = require('shelljs');
// Simple Git with Promise for handling success and failure
const simpleGitPromise = require('simple-git/promise')();


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
    
