const mysql = require('mysql2');
require('dotenv').config();
const cTable = require('console.table');

const db = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
)

async function getDepartments() {
    const res = await db.promise().query('SELECT * FROM departments;');
    return res[0];
}

async function getRoles() {
    const res = await db.promise().query('SELECT * FROM roles;');
    return res[0];
}

async function getEmployees() {
    const res = await db.promise().query('SELECT * FROM employees;');
    return res[0];
}

async function insertDepartment(deptName) {
    try {
        const res = await db.promise().query(`INSERT INTO departments (department_name)
            VALUES ("${deptName}");`);
        console.log("Department successfully inserted");
    } catch (err) {
        console.error("An error occurred when inserting the department");
        console.error(err);
    }
}

async function insertRole(title, salary, departmentId) {
    try {
        const res = await db.promise().query(`INSERT INTO roles (title, salary, department_id)
            VALUES ("${title}", ${salary}, ${departmentId});`);
        console.log("The role was successfully inserted!");
    } catch (err) {
        console.error("An error occurred when inserting the role");
        console.error(err);
    }
}

async function insertEmployee(firstName, lastName, roleId, managerId) {
    try {
        const res = db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId});`);
        console.log('The employee was successfully added!');
    } catch (err) {
        console.error("An error occurred when inserting the employee");
        console.error(err);
    }
}

async function updateEmployeeRole(employeeId, roleId) {
    try {
        const res = db.promise().query(`UPDATE employees
        SET role_id = ${roleId}
        WHERE id = ${employeeId};`);
        console.log('The employee was successfully updated!');
    } catch (err) {
        console.error("An error occurred when updating the employee");
        console.error(err);
    }
}


exports.getDepartments = getDepartments;
exports.getRoles = getRoles;
exports.getEmployees = getEmployees;
exports.insertDepartment = insertDepartment;
exports.insertRole = insertRole;
exports.insertEmployee = insertEmployee;
exports.updateEmployeeRole = updateEmployeeRole;