const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_DB'
});

const employeeOpt = () => {
    inquirer
        .prompt({
            name: 'listoption',
            type: 'list',
            choices: ['Add department', 'Add role', 'Add employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee Role']//add exit for user?
        })
        .then((answer) => {
            switch (answer.listoption) {
                case 'Add department':
                    return addDept();
                case 'Add role':
                    return addRole();
                case 'Add employee':
                    return addEmp();
                case 'View Departments':
                    return viewDepartment();
                case 'View Roles':
                    return viewRoles();
                case 'View Employees':
                    return viewEmployees();
                case 'Update Employee Role':
                    return changeErole();
            }
        })
};
const addDept = () => {
    inquirer
        .prompt({
            name: 'newDept',
            type: 'input',
            message: 'Enter new department name',
        })
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    department_name: answer.newDept,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your department was created successfully!');
                    employeeOpt();
                }
            );
        })
};
const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'newRole',
                type: 'input',
                message: 'Enter new role title',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter Salary',
            },
            {
                name: 'dptId',
                type: 'input',
                message: 'What department ID does this employee belong to?',
            }
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO roles SET ?',
                {
                    title: answer.item,
                    salary: answer.item,
                    department_id: answer.dptId,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your auction was created successfully!');
                    employeeOpt();
                }
            );
        });
};
const addEmp = () => {
    inquirer
        .prompt([
            {
                name: 'firstname',
                type: 'input',
                message: 'Enter employee first name',
            },
            {
                name: 'lastname',
                type: 'input',
                message: 'Enter employee last name',
            },
            {
                name: 'role',//
                type: 'input',
                message: 'roleid',//
            },
            {
                name: 'manid',
                type: 'input',
                message: 'managerid',//
            }
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employees SET ?', //
                {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: answer.role,
                    manager_id: answer.manid,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    employeeOpt();
                }
            );
        });
}

const viewDepartment = () => {
    console.log('Pulling up department information...\n');
    connection.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      console.log(res);
    });
    employeeOpt();
  };


const viewRoles = () => {
    console.log('Pulling up roles...\n');
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.log(res);
    })
    employeeOpt();
}
const viewEmployees = () => {
    console.log('Pulling up employees...\n');
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        console.log(res);
    }) 
    employeeOpt();
}

  employeeOpt();

connection.connect((err) => {
    if (err) throw err;
});