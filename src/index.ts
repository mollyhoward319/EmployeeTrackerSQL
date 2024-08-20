import inquirer from "inquirer";
import DB from "./db.js";
const cTable = require("console.table");

async function getEmployees() {
  try {
    const db = DB.getInstance();
    const response = await db.query(`SELECT * FROM employee;`);
    console.table(response.rows);
  } catch (error) {
    console.error(error);
  }
}
// getEmployees();
async function getRoles() {
  try {
    const db = DB.getInstance();
    const response = await db.query(`SELECT * FROM role;`);
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
async function updateRoles(employeeid:string, roleid:string) {
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
