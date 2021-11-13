const initQuestion = [
    {
        type: 'list',
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "nothing, I'm all done"],
        name: 'type',
        message: 'What would you like to do?',
    },
]

const addDeptQuestions = [
    {
        type: 'input',
        message: 'Please enter the department name.',
        name: 'deptName',
    },
]

const addRoleQuestions = [
    {
        type: 'input',
        message: 'Please enter the role title.',
        name: 'title',
    },
    {
        type: 'input',
        message: 'What is the salary for the role?',
        name: 'salary',
    },
    {
        type: 'list',
        message: 'What department does the role correspond to?',
        name: 'roleDept',
        // the choices piece will be created before these questions are asked
        // it will list out the current departments for the role
    },
]

const addEmpQuestions = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName',
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lastName',
    },
    {
        type: 'input',
        message: "What is the employee's role/title?",
        name: 'empRole',
    },
    {
        type: 'input',
        message: "Who is the employee's manager?\nIf none, press ENTER",
        name: 'empManager',
    },
]