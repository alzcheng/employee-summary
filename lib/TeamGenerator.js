const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve("./output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./htmlRenderer");

class TeamGenerator {
  constructor() {
    this.team = [];
  }

  start() {
    this.askForNewMember();
  }

  askForNewMember() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "newMember",
          message: "Do you want to add a new member to your team?",
        },
      ])
      .then((answers) => {
        if (answers.newMember) {
          this.askForMemberType();
        } else if (this.team.length === 0) {
          //We don't want to create a webpage with no one in it.  This checks that
          //there is at least 1 team member in the team.
          console.log(
            "No team member is in the team.  No new team webpage is created."
          );
          return;
        } else {
          fs.writeFile(outputPath, render(this.team), (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
          console.log("done");
        }
      });
  }

  askForMemberType() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberType",
          message: "What type of team member would you like to add?",
          choices: ["Manager", "Engineer", "Intern"],
        },
      ])
      .then((answers) => {
        if (answers.memberType === "Manager") {
          this.createManager();
        } else if (answers.memberType === "Engineer") {
          this.createEngineer();
        } else {
          this.createIntern();
        }
      });
  }

  createManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the Manager's name?",
          validate: (input) => {
            if (!isNaN(parseInt(input)) || input === "") {
              return "Please enter a string.";
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "id",
          message: "What is the Manager's ID number?",
          validate: (input) => {
            if (isNaN(parseInt(input)) || input === "") {
              return "Please enter a number.";
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "email",
          message: "What is the Manager's email?",
          validate: (input) => {
            if (!isNaN(parseInt(input)) || input === "") {
              return "Please enter a string.";
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "officeNumber",
          message: "What is the Manager's office number?",
          validate: (input) => {
            if (isNaN(parseInt(input)) || input === "") {
              return "Please enter a number.";
            } else {
              return true;
            }
          },
        },
      ])
      .then((answers) => {
        const NewManager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        );
        this.team.push(NewManager);
        console.log("Manager Created");
        this.askForNewMember();
      });
  }

  createEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the Engineer's name?",
          validate: (input) => {
            if (!isNaN(parseInt(input)) || input === "") {
              return "Please enter a string.";
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "id",
          message: "What is the Engineer's ID number?",
          validate: (input) => {
            if (isNaN(parseInt(input)) || input === "") {
              return "Please enter a number.";
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "email",
          message: "What is the Engineer's email?",
          validate: (input) => {
            if (!isNaN(parseInt(input)) || input === "") {
              return "Please enter a string.";
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "github",
          message: "What is the Engineer's Github username?",
          //No validation for this since Github username may contain alphanumeric characters
        },
      ])
      .then((answers) => {
        const NewEngineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        this.team.push(NewEngineer);
        console.log("Engineer Created");
        this.askForNewMember();
      });
  }

  createIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the Intern's name?",
          validate: (input) => {
            if (!isNaN(parseInt(input)) || input === "") {
              return "Please enter a string.";
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "id",
          message: "What is the Intern's ID number?",
          validate: (input) => {
            if (isNaN(parseInt(input)) || input === "") {
              return "Please enter a number.";
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "email",
          message: "What is the Intern's email?",
          validate: (input) => {
            if (!isNaN(parseInt(input)) || input === "") {
              return "Please enter a string.";
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "school",
          message: "What is the Intern's school?",
          validate: (input) => {
            if (!isNaN(parseInt(input)) || input === "") {
              return "Please enter a string.";
            } else {
              return true;
            }
          },
        },
      ])
      .then((answers) => {
        const NewIntern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        this.team.push(NewIntern);
        console.log("Intern Created");
        this.askForNewMember();
      });
  }
}
module.exports = TeamGenerator;
