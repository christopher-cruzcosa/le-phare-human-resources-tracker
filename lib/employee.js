class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.role = "Employee";
      this.email = email;
    }

    getName () {
        return this.name;
    }

    getRole() {
        return this.role;
    }
    getId () {
        return this.id;
    }
    getEmail () {
        return this.email;
    }
  }

  module.exports = Employee;