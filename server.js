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
    const sql = `SELECT role.id, role.title, department.name AS department
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
                        AS employee_name, role.title, department.name AS department
                        FROM employee
                        LEFT JOIN role ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id`;

    db.promise().query(sql)
        .then(([rows]) => {
            console.table(rows);
            promptUser();
        })
        .catch(console.log)
}

const addDepartment = () => {

}

const addRole = () => {

}

const addEmployee = () => {

}

const updateEmployeeRole = () => {

}




promptUser();