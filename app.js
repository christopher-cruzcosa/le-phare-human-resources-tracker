const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = [];


function main_prompt() {
    return inquirer.prompt([
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

};

// function secondary_prompt(answer) {
//     if (answer.role === "Manager") {
//         answer.officeNumber = inquirer.prompt([
//             {
//                 type: "input",
//                 message: "What is the managers's office number?",
//                 name: "officeNumber",
//             },
//         ])
//     } else
//         if (answer.role === "Intern") {
//             answer.school = inquirer.prompt([
//                 {
//                     type: "input",
//                     message: "What is the name of your school?",
//                     name: "school",
//                 },
//             ])
//         } else
//             if (answer.role === "Engineer") {
//                 answer.github = inquirer.prompt([
//                     {
//                         type: "input",
//                         message: "What is your Github username?",
//                         name: "github",
//                     },
//                 ])
//             }
//     return answer
// }


function employeeCreation() {
    main_prompt()
        .then((answers) => {
            if (answers.role === "Manager") {
                const newEmployee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                employeeArray.push(newEmployee);
                console.log("New employee record created");
                console.log(employeeArray);
            }
            if (answers.role === "Intern") {
                const newEmployee = new Intern(answers.name, answers.id, answers.email, answers.school)
                employeeArray.push(newEmployee);
                console.log("New employee record created");
                console.log(employeeArray);
            }
            if (answers.role === "Manager") {
                const newEmployee = new Engineer(answers.name, answers.id, answers.email, answers.github)
                employeeArray.push(newEmployee);
                console.log("New employee record created");
                console.log(employeeArray);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

function main_control (){
    let keepWorking = true;
    console.log("Welcome to the le Phare Corp's Human Resources digitizer!")
    // while (keepWorking) {
    //     employeeCreation();
    //     if (inquirer.prompt([
    //         {
    //             type: "list",
    //             message: "Do you wish to make another employee record?",
    //             name: "continue",
    //             choices: [
    //                 "yes",
    //                 "no"
    //             ]
    //         },
    //     ]) === {continue: "no"}) {  
    //         keepWorking = false;
    //         console.log("Goodbye, friend")
    //     }
    // }
    employeeCreation();
};

main_control();



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
