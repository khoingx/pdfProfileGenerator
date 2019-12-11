const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
// const generateHTML = require('./generateHTML');


const writeFileAsync = util.promisify(fs.writeFile);

const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };
  
function generateHTML(response) {
    return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Hi! My name is ${response.data.name}</h1>
      <img src="${response.data.avatar_url}" alt="Smiley face" height="100" width="100">
      <p class="lead">I am from ${response.data.location}.</p>
      <h3> <span class="badge badge-secondary">Contact Me</span></h3>
      <ul class="list-group">
        <li class="list-group-item">My GitHub username is ${response.data.login}</li>
        <li class="list-group-item">LinkedIn: ${response.data.linkedin}</li>
        <li class="list-group-item">Bio: ${response.data.bio}</li>
        <li class="list-group-item">Followers: ${response.data.followers}</li>
        <li class="list-group-item">Followers: ${response.data.following}</li>

      </ul>
    </div>
  </div>
  </body>
  </html>`;
  }  

inquirer
    .prompt([
        {
            type: "input",
            name: "username",
            message: "What is your Github username ?"
        },
        {
            type: "input",
            name: "color",
            message: "What is your favorite color? (Green, blue, pink, red) ?"
        }
    ])
    .then(function({username}){
        const queryURL = `https://api.github.com/users/${username}`;

        axios
        .get(queryURL)
        .then(function(response){
            console.log(response);
            // console.log(response.data.login);
            // console.log(response.data.public_repos);

            const html = generateHTML(response);

            return writeFileAsync("index.html", html);
        })
        .then(function(){
            console.log("Successfully wrote to index.html");
        })
        .catch(function(error){
            console.log(error);
        });
    })




// const questions = [


// ];

function writeToFile(fileName, data) {

}

function init() { }

init();
