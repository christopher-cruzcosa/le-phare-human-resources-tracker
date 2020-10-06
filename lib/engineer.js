const Employee = require("./employee")

class Engineer extends Employee {
    constructor(name, id, email, github) {
      super(name, id, "Engineer", email);
      this.github = github;
    }
  }

  module.exports = Engineer;  