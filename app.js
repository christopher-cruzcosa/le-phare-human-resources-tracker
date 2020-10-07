const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//This class controls the prompts and eventually generates the team.html file from the entered employees
class Team {
    constructor() {
        this.staff = [];
    }

    //This function begins the data collection
    run() {
        console.log("Welcome to the le Phare Corp's Human Resources digitizer!")
        return this.addEmployee();
    }

    //This function gathers the information on a new employee
    addEmployee() {
        return inquirer
            .prompt([
                {

                    type: "list",
                    message: "A new employee record is being created. What type of employee record are you entering?",
                    name: "role",
                    choices: [
                        "Manager",
                        "Engineer",
                        "Intern",
                    ]
                },
                {
                    type: "input",
                    message: "What is the employee's name?",
                    name: "name",
                },
                {
                    type: "input",
                    message: "What is the employee's ID number?",
                    name: "id",
                },
                {
                    type: "input",
                    message: "What is the employee's email address",
                    name: "email",
                },
                {
                    type: "input",
                    message: "What is the managers's office number?",
                    name: "officeNumber",
                    when: function (answers) {
                        return answers.role === "Manager"
                    },
                },
                {
                    type: "input",
                    message: "What is the name of the intern's school?",
                    name: "school",
                    when: function (answers) {
                        return answers.role === "Intern"
                    },
                },
                {
                    type: "input",
                    message: "What is the engineer's Github username?",
                    name: "github",
                    when: function (answers) {
                        return answers.role === "Engineer"
                    },
                },
            ])
            //This function uses the data to create a new class object, either manager or intern or engineer
            //Also, it gives the user the chance to make another employee or end the data collection
            .then((answers) => {
                if (answers.role === "Manager") {
                    const newEmployee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                    this.staff.push(newEmployee);
                    return this.confirmDone();
                }
                if (answers.role === "Intern") {
                    const newEmployee = new Intern(answers.name, answers.id, answers.email, answers.school)
                    this.staff.push(newEmployee);
                    return this.confirmDone();
                }
                if (answers.role === "Engineer") {
                    const newEmployee = new Engineer(answers.name, answers.id, answers.email, answers.github)
                    this.staff.push(newEmployee);
                    return this.confirmDone();
                }
                return this.confirmDone();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //This function asks the user if they want to continue
    confirmDone() {
        return inquirer
            .prompt([
                {
                    type: "confirm",
                    message: "A new employee record was created successfull! Do you want to make another record?",
                    name: "continue",
                },
            ])
            .then((answers) => {
                if (answers.continue) {
                    return this.addEmployee();
                }
                return this.renderFile()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //This function generates the team.html file
    renderFile(){
        fs.writeFile(outputPath, render(this.staff), (err) => {
            if (err) throw err;
            console.log('A new team.html file was created!');
          })
    }
}


//creating a new Team object
const newTeam = new Team();

//activating the team object to begin the application
newTeam.run();

module.exports = Team;

