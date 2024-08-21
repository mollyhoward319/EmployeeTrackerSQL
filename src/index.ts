import inquirer from "inquirer";
import DB from "./db.js";
const cTable = require("console.table");

async function getEmployees() {
  try {
    const db = DB.getInstance();
    const response =
      await db.query(`SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary, 
      CONCAT (manager.first_name, manager.last_name) 
      AS manager FROM employee LEFT JOIN role ON employee.role_id =role.id 
      LEFT JOIN department ON role.department_id=department.id 
      LEFT JOIN employee manager ON manager.id =employee.manager_id;`);
    console.table(response.rows);
  } catch (error) {
    console.error(error);
  }
}
// getEmployees();
async function getRoles() {
  try {
    const db = DB.getInstance();
    const response =
      await db.query(`SELECT role.title, role.salary, department.name AS departmentname FROM role
      LEFT JOIN department ON role.department_id=department.id`);
    console.table(response.rows);
  } catch (error) {
    console.error(error);
  }
}
async function getDepartments() {
  try {
    const db = DB.getInstance();
    const response = await db.query(`SELECT * FROM department;`);
    console.table(response.rows);
  } catch (error) {
    console.error(error);
  }
}
async function addDepartment(departmentName: string) {
  try {
    const db = DB.getInstance();
    const response = await db.query(`INSERT INTO department(name) VALUES ($1);`,[departmentName]);
    console.table(response.rows);
  } catch (error) {
    console.error(error);
  }
}
async function addEmployee() {
  try {
    const db = DB.getInstance();
    const response = await db.query(`INSERT INTO (name) VALUES ($1);`,[]);
    console.table(response.rows);
  } catch (error) {
    console.error(error);
  }
}
async function addRole(title:string, salary:number, departmentId:number) {
  try {
    const db = DB.getInstance();
    const response = await db.query(`INSERT INTO role(title, salary, department_id) VALUES ($1, $2, $3);`,[title, salary, departmentId]);
    console.table(response.rows);
  } catch (error) {
    console.error(error);
  }
}

async function updateRoles(employeeid: string, roleid: string) {
  try {
    const db = DB.getInstance();
    const response = await db.query(
      `UPDATE employee SET role_id =$1 WHERE employee.id =$2;`,
      [parseInt(roleid), parseInt(employeeid)]
    );
    console.table(response.rows);
  } catch (error) {
    console.error(error);
  }
}

async function prompt() {
  const response = await inquirer.prompt([
    {
      name: "mainoptions",
      message: "What would you like to do?",
      type: "list",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add An Employee",
        "Add A Department",
        "Add A Role",
        new inquirer.Separator(),
        "Update Employee Role",
        new inquirer.Separator(),
        "Exit",
      ],
    },
  ]);
  console.log(response);
  if (response.mainoptions === "View All Employees") {
    await getEmployees();
  }
  if (response.mainoptions === "View All Roles") {
    await getRoles();
  }
  if (response.mainoptions === "View All Departments") {
    await getDepartments();
  }
  if (response.mainoptions === "Add A Department") {
    const departmentInput = await inquirer.prompt([
      {name: "departmentName", message: "What is the Name of the Department?"}
    ])
    await addDepartment(departmentInput.departmentName);
  }
  if (response.mainoptions === "Add An Employee") {
    const db = DB.getInstance();
    const departments= await db.query("SELECT * FROM employee")
    const departmentChoices=departments.rows.map((dept:any)=>{
      return {
        name: dept.name
        value: dept.id
      }
    })
    await addEmployee();
  }
  if (response.mainoptions === "Add A Role") {
    const db = DB.getInstance();
    const departments= await db.query("SELECT * FROM department")
    const departmentChoices= departments.rows.map((dept: any)=>{
      return {
        name: dept.name, 
        value: dept.id
      }
    })
    // console.log(departments);
    // console.log (departmentChoices);
    
    const roleInput = await inquirer.prompt ([
      { name: "roletitle", message: "What Title Do You Want to Add?"},
      { name: "salary", message: "What Should Salary Be?"},
      { type: "list", name: "departmentId", message: "What Is the Department", choices: departmentChoices}
    ])
    await addRole(roleInput.roletitle, roleInput.salary, roleInput.departmentId);
  }
  if (response.mainoptions === "Update Employee Role") {
    await getEmployees();
    const employeeresponse = await inquirer.prompt([
      { name: "employeeid", message: "What's the Employee ID?" },
    ]);
    await getRoles();
    const roleresponse = await inquirer.prompt([
      { name: "roleid", message: "What's the Role ID?" },
    ]);
    await updateRoles(employeeresponse.employeeid, roleresponse.roleid);
    await getEmployees();
  }

  if (response.mainoptions !== "Exit") await prompt();
}

prompt();
