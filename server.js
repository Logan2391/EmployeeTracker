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
            const roleAnswers = [answers.roleName, answers.roleSalary]
            const depSql = 'SELECT name FROM department'

            db.promise().query(depSql)
                .then(([row]) => {
                    let deptName = row.map(({ name }) => ({ name: name }))

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
                            
                            const sql = 
                        })
                })
        })

}

const addEmployee = () => {

}

const updateEmployeeRole = () => {

}




promptUser();