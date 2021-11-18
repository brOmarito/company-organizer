const inquirer = require('inquirer');
// const mysql = require('mysql2');
const dbHelper = require('./src/dbHelper');
require('dotenv').config();
const cTable = require('console.table');

let currDepts = [];
let currRoles = [];
let currEmps = [];

const {
    initQuestion,
    addDeptQuestions,
    addRoleQuestions,
    addEmpQuestions,
    continueQuestion,
    updateEmployeeRoleQuestions,
} = require('./src/questions');

function exitApp() {
    console.log("Exiting...")
    process.exit();
}

async function askContinue() {
    const { continue:isContinue } = await inquirer.prompt(continueQuestion);
    if (isContinue === "Exit") exitApp();
    console.log("\n");
    init();
}

async function getDepartmentLogic() {
    const res = await dbHelper.getDepartments();
    console.table(res);
}

async function getRoleLogic() {
    const res = await dbHelper.getRoles();
    console.table(res);
}

async function getEmployeeLogic() {
    const res = await dbHelper.getEmployees();
    console.table(res);
}

async function addDepartmentLogic() {
    const { deptName } = await inquirer.prompt(addDeptQuestions);
    if (!deptName.trim()) {
        console.log("Please provide a name that isn't empty");
        await addDepartmentLogic();
    } else {
        try {
            const res = await dbHelper.insertDepartment(deptName.trim());
            console.log("Department successfully inserted! Here are the updated departments:");
            await getDepartmentLogic();
        } catch {
            console.log("An error occured when inserting the department.");
        }
    }
}

function validateRoleEntry(title, roleDept) {

}

async function setDepartmentChoices() {
    currDepts = await dbHelper.getDepartments();
    const depts = [];
    currDepts.forEach(dept => {
        depts.push(dept.department_name);
    });
    addRoleQuestions[2].choices = depts;
}

function getDeptId(name) {
    return new Promise((resolve, reject) => {
        currDepts.forEach(dept => {
            if (dept.department_name === name) {
                resolve(dept.id);
            }
        });
    });
}

async function addRoleLogic() {
    await setDepartmentChoices();
    const { title, salary, roleDept } = await inquirer.prompt(addRoleQuestions);
    const deptId = await getDeptId(roleDept);
    if (!title.trim()) {
        console.log("Please provide a title that isn't empty");
        await addRoleLogic();
    } else {
        const res = await dbHelper.insertRole(title, salary, deptId);
        console.log("Here are the current roles:")
        await getRoleLogic();
    }
}

async function setRoleChoices(questionObj) {
    currRoles = await dbHelper.getRoles();
    currDepts = await dbHelper.getDepartments();
    return new Promise((resolve, reject) => {
        const roles = [];
        currRoles.forEach(role => {
            let thisDept = "";
            currDepts.forEach(dept => {
                if (dept.id === role.department_id) thisDept = dept.department_name;
            });
            roles.push(role.id + " " + thisDept + " - " + role.title);
        });
        resolve(roles);
    });
}

async function setEmployeeChoices() {
    currEmps = await dbHelper.getEmployees();
    return new Promise((resolve, reject) => {
        const emps = [];
        currEmps.forEach(emp => {
            emps.push(emp.id + " " + emp.first_name + " " + emp.last_name);
        });
        resolve(emps);
    });
}

async function addEmployeeLogic() {
    addEmpQuestions[2].choices = await setRoleChoices();
    addEmpQuestions[3].choices = await setEmployeeChoices();
    addEmpQuestions[3].choices.push("NONE");
    const { firstName, lastName, empRole, empManager } = await inquirer.prompt(addEmpQuestions);
    if (!firstName.trim() || !lastName.trim()) {
        console.log("Please provide the employee's full name.");
        await addEmployeeLogic();
    } else {
        const roleId = empRole.substring(0,1);
        const mgrId = empManager.substring(0,1) === "N" ? "NULL" : empManager.substring(0,1);
        const res = await dbHelper.insertEmployee(firstName, lastName, roleId, mgrId);
        console.log("Here are the current employees:");
        await getEmployeeLogic();
    }
}

async function updateEmployeeRoleLogic() {
    updateEmployeeRoleQuestions[0].choices = await setEmployeeChoices();
    updateEmployeeRoleQuestions[1].choices = await setRoleChoices();
    const { employee, role } = await inquirer.prompt(updateEmployeeRoleQuestions);
    const roleId = role.substring(0,1);
    const empId = employee.substring(0,1);
    const res = await dbHelper.updateEmployeeRole(empId, roleId);
    console.log("Here are the current employees:");
    await getEmployeeLogic();
}

async function init() {
    const { action } = await inquirer.prompt(initQuestion);
    console.log("\n");
    if (action === 'view all departments') {
        await getDepartmentLogic();
    } else if (action === 'view all roles') {
        await getRoleLogic();
    } else if (action === 'view all employees') {
        await getEmployeeLogic();
    } else if (action === 'add a department') {
        await addDepartmentLogic();
    } else if (action === 'add a role') {
        await addRoleLogic();
    } else if (action === 'add an employee') {
        await addEmployeeLogic();
    } else if (action === 'update an employee role') {
        await updateEmployeeRoleLogic();
    } else if (action === "Nothing, I'm all done") {
        exitApp();
    }
    askContinue();
}

init();
