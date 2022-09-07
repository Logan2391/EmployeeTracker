const mysql = require('mysql2');
const inquirer = require('inquirer');
require("console.table");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'company_db'
    },
);

const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: "choices",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ])
        .then((answers) => {
            const { choices } = answers;

            if (choices === "View all departments") {
                viewDepartments();
            }

            if (choices === "View all roles") {
                viewRoles();
            }

            if (choices === "View all employees") {
                viewEmployees();
            }

            if (choices === "Add a department") {
                addDepartment();
            }

            if (choices === "Add a role") {
                addRole();
            }

            if (choices === "Add an employee") {
                addEmployee();
            }

            if (choices === "Update an employee role") {
                updateEmployeeRole();
            }
        });
};

const viewDepartments = () => {
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    db.promise().query(sql)
        .then(([rows]) => {
            console.table(rows);
            promptUser();
        })
        .catch(console.log)
};

const viewRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department
                 FROM role
                 INNER JOIN department ON role.department_id = department.id`;

    db.promise().query(sql)
        .then(([rows]) => {
            console.table(rows);
            promptUser();
        })
        .catch(console.log)
}

const viewEmployees = () => {
    const sql = `SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name)
                        AS employee_name, role.title, department.name AS department,
                        role.salary, CONCAT(manager.first_name, " ", manager.last_name)
                        AS manager FROM employee
                        LEFT JOIN role ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN employee manager ON manager.id = employee.manager_id`;

    db.promise().query(sql)
        .then(([rows]) => {
            console.table(rows);
            promptUser();
        })
        .catch(console.log)
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "newDep",
            message: 'What department would you like to add?',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("Please enter a department name.")
                }
                return true;
            },
        }
    ])
        .then((answer) => {
            const sql = `INSERT INTO department (name) VALUES (?)`;

            db.promise().query(sql, answer.newDep)
                .then(([rows]) => {
                    console.table(rows);
                    viewDepartments();
                })
                .catch(console.log)
        })
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of your the new role?',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("Please enter the name of the role.")
                }
                return true;
            },
        },
        {
            type: "input",
            name: 'roleSalary',
            message: 'What is the salary of the new role?',
            validate: function (answer) {
                if (isNaN(answer)) {
                    console.log('  Please enter a numeric value')
                    return false;
                } else {
                    return true;
                }

            },
        }
    ])
        .then((answers) => {
            const roleAnswers = [answers.roleName, answers.roleSalary];
            const depSql = `SELECT name, id FROM department`;

            db.promise().query(depSql)
                .then(([row]) => {
                    let deptName = row.map(({ name, id }) => ({ name: name, value: id }))

                    inquirer.prompt([
                        {
                            type: 'list',
                            message: 'What department is the new role in?',
                            name: "dept",
                            choices: deptName
                        }
                    ])
                        .then((deptChoice) => {
                            const dept = deptChoice.dept;
                            roleAnswers.push(dept);

                            const sql = `INSERT INTO role (title, salary, department_id)
                                        VALUES (?, ?, ?)`;

                            db.promise().query(sql, roleAnswers)
                                .then(() => {
                                    viewRoles();
                                })
                                .catch(console.log)
                        })
                })
        })

}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "newEmpFN",
            message: 'What is the new employees first name?',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("Please enter the employees first name.")
                }
                return true;
            },
        },
        {
            type: 'input',
            name: "newEmpLN",
            message: 'What is the new employees first name?',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("Please enter the employees last name.")
                }
                return true;
            },
        }
    ])
        .then((answers) => {
            const newEmpAnswers = [answers.newEmpFN, answers.newEmpLN];
            const roleSql = `SELECT title, id FROM role`;

            db.promise().query(roleSql)
                .then(([row]) => {
                    let roleName = row.map(({ title, id }) => ({ name: title, value: id }))

                    inquirer.prompt([
                        {
                            type: 'list',
                            message: 'What role will the new employee take?',
                            name: "newEmpRole",
                            choices: roleName
                        }
                    ])
                        .then((newEmpRoleChoice) => {
                            const roleId = newEmpRoleChoice.newEmpRole;
                            newEmpAnswers.push(roleId);
                            let managerId;

                            if (roleId == 1) {
                                managerId = 3
                            }

                            if (roleId == 2) {
                                managerId = 3
                            }

                            if (roleId == 3) {
                                managerId = 3
                            }

                            if (roleId == 4) {
                                managerId = 2
                            }

                            if (roleId == 5) {
                                managerId = 2
                            }

                            if (roleId == 6) {
                                managerId = 2
                            }

                            if (roleId == 7) {
                                managerId = 4
                            }

                            if (roleId == 8) {
                                managerId = 4
                            }

                            if (roleId == 9) {
                                managerId = null
                            }

                            if (roleId == 10) {
                                managerId = null
                            }

                            if (roleId == 11) {
                                managerId = null
                            }

                            if (roleId == 12) {
                                managerId = null
                            }

                            newEmpAnswers.push(managerId)

                            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                        VALUES (?, ?, ?, ?)`;

                            db.promise().query(sql, newEmpAnswers)
                                .then(() => {
                                    viewEmployees();
                                })
                                .catch(console.log)

                        })
                })
        })
}

const updateEmployeeRole = () => {
    const empSql = `SELECT employee.first_name, employee.last_name, id FROM employee`;

    db.promise().query(empSql)
        .then(([row]) => {
            let empName = row.map(({ first_name, last_name, id }) => ({ name: first_name + " " + last_name, value: id }))

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'updEmp',
                    message: 'Choose and employee to update their role.',
                    choices: empName
                }
            ])
                .then((updEmpChoice) => {
                    const updateAnswers = [];
                    const emp = updEmpChoice.updEmp
                    const roleSql = `SELECT title, id FROM role`;

                    db.promise().query(roleSql)
                        .then(([row]) => {
                            let roleName = row.map(({ title, id }) => ({ name: title, value: id }))

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    message: 'What is the employees new role?',
                                    name: "updRole",
                                    choices: roleName
                                }
                            ])
                                .then((updRoleChoice) => {
                                    const role = updRoleChoice.updRole;
                                    const manUpd = [];
                                    let managerId;
                                    updateAnswers.push(role);
                                    updateAnswers.push(emp);

                                    if (role == 1) {
                                        managerId = 3
                                    }

                                    if (role == 2) {
                                        managerId = 3
                                    }

                                    if (role == 3) {
                                        managerId = 3
                                    }

                                    if (role == 4) {
                                        managerId = 2
                                    }

                                    if (role == 5) {
                                        managerId = 2
                                    }

                                    if (role == 6) {
                                        managerId = 2
                                    }

                                    if (role == 7) {
                                        managerId = 4
                                    }

                                    if (role == 8) {
                                        managerId = 4
                                    }

                                    if (role == 9) {
                                        managerId = null
                                    }

                                    if (role == 10) {
                                        managerId = null
                                    }

                                    if (role == 11) {
                                        managerId = null
                                    }

                                    if (role == 12) {
                                        managerId = null
                                    }

                                    manUpd.push(managerId);
                                    manUpd.push(emp);

                                    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                                    const manSql = `UPDATE employee SET manager_id = ? WHERE id = ?`


                                    db.promise().query(manSql, manUpd)
                                        .then(() => {
                                            db.promise().query(sql, updateAnswers)
                                                .then(() => {
                                                    viewEmployees();
                                                })
                                                .catch(console.log)
                                        })
                                        .catch(console.log)

                                })
                        })
                })
        })
}

promptUser();