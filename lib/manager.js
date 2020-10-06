const Employee = require("./employee")

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
      super(name, id, "Manager", email);
      this.officeNumber = officeNumber;
    }
  }

  module.exports = Manager;  