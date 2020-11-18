// require modules
var inquirer = require("inquirer");
var generateMarkdown = require("./utils/generateMarkdown");
var axios = require("axios");
var fs = require("fs");

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
  // todo - License
  {
    name: "contibutors",
    message: "Enter the contibutors:"
  },
  {
    name: "tests",
    message: "Enter the tests:"
  }
  // todo - questions
];

function init() {
  inquirer.prompt(questions).then(answers => {
    console.log(answers);
    axios
      .get("https://api.github.com/users/" + answers.username)
      .then(response => {
        console.log(response);
        fs.writeFile("README.md", generateMarkdown(answers), function(err) {
          if (err) {
            return console.log(err);
          }
        });
      });
  });
}

init();