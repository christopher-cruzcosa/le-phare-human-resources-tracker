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
const writeFileAsync = util.promisify(fs.writeFile);


class Team {
    constructor() {
        this.staff = [];
    }

    run() {
        console.log("Welcome to the le Phare Corp's Human Resources digitizer!")
        return this.addEmployee();
    }

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
                    message: "What is the name of your school?",
                    name: "school",
                    when: function (answers) {
                        return answers.role === "Intern"
                    },
                },
                {
                    type: "input",
                    message: "What is your Github username?",
                    name: "github",
                    when: function (answers) {
                        return answers.role === "Engineer"
                    },
                },
            ])
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
            // .then((answers) => {
            //     fs.writeFile(outputPath,answers)
            // })
            .catch((err) => {
                console.log(err);
            });
    }

    renderFile(){
        fs.writeFile(outputPath, render(this.staff), (err) => {
            if (err) throw err;
            console.log('A new team.html file was created!');
          })
    }

    // createHTML() {
    //     const HTMLtext = render(this.staff);

    //     fs.writeFile(outputPath,HTMLtext);
    //     // this.staff.forEach((task, i) => console.log(`${i + 1}. ${task}`));
    //     process.exit(0);
    // }
}

const newTeam = new Team();

newTeam.run();

module.exports = Team;



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
