const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

class TeamGenerator {
  constructor() {
    this.continue = false;
    this.team = [];
  }

  start() {
    this.continue = true;
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
          console.log(answers);
          this.askForMemberType();
        } else {
          this.continue = false;
          //this.quit();
          console.log("quit");
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
    console.log("Manager Created");
    this.askForNewMember();
  }

  createEngineer() {
    console.log("Engineer Created");
    this.askForNewMember();
  }

  createIntern() {
    console.log("Intern Created");
    this.askForNewMember();
  }
}

module.exports = TeamGenerator;
