const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//const TeamGenerator = require("./lib/TeamGenerator");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Creating TeamGenerator class that I want to refractor
// TeamGenerator class gather information about the development team members,
// and create objects for each team member.

// After the user has input all employees desired, it calls render to create
// a sting of html and then uses fs.writeFile to write the HTML 'team.html' in
// the output folder.

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
        //test if team is empty
        //if team is not empty, generate file
        if (answers.newMember) {
          this.askForMemberType();
        } else {
          this.continue = false;
          //this.quit();
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
        },
        {
          type: "input",
          name: "id",
          message: "What is the Manager's ID number?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the Manager's email?",
        },
        {
          type: "input",
          name: "officeNumber",
          message: "What is the Manager's office number?",
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
        },
        {
          type: "input",
          name: "id",
          message: "What is the Engineer's ID number?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the Engineer's email?",
        },
        {
          type: "input",
          name: "github",
          message: "What is the Engineer's Github username?",
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
        },
        {
          type: "input",
          name: "id",
          message: "What is the Intern's ID number?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the Intern's email?",
        },
        {
          type: "input",
          name: "school",
          message: "What is the Intern's school?",
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

const myTeam = new TeamGenerator();
myTeam.start();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
