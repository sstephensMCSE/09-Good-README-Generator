// require modules
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");

// Array containing the questions for inquirer
const questions = [
    {
        name: "username",
        message: "Enter your GitHub username:",
        default: "sstephensMCSE"
    },
    {
        message: "Enter your repo name:",
        name: "repo",
        default: "09-Good-README-Generator"
    },
    {
        name: "title",
        message: "Enter the project title:",
        default: "Generate a README file "
    },
    {
        name: "description",
        message: "Enter the project description:"
    },
    {
        name: "installation",
        message: "Enter the installation instructions:"
    },
    {
        name: "usage",
        message: "Enter the usage directions:"
    },
    {
        type: "list",
        name: "license",
        message: "Select license type:",
        choices: ["Public","Creative Commons","Mozilla Public License","The Unlicense"]
    },
    {
        name: "contibutors",
        message: "Enter the project contibutors names:"
    },
    {
        name: "tests",
        message: "Enter the tests:"
    },
];

function generateReadme(data) {
    return `
  # Project Title : ${data.title}

  ## Project Description:
  ${data.description}
  
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributors](#Contributors)
  * [Tests](#tests)
  * [Questions](#questions)

  ## Installation
  ${data.installation}
  ## Usage
  ${data.usage}

  ## License
  ${data.license}
  
  ## Contributors
  ${data.contributors}

  ## Tests
  ${data.tests}

  ## Questions
  If you have any questions, contact ${data.username} on GitHub.
 
  `;
  }

function init() {
  inquirer.prompt(questions).then(answers => {
    console.log(answers);
    axios
      .get("https://api.github.com/users/" + answers.username)
      .then(response => {
        console.log(response);
        fs.writeFile("README.md", generateReadme(answers), function(err) {
          if (err) {
            return console.log(err);
          }
        });
      });
  });
}

init();