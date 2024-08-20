SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'inventory_db'
AND pid <> pg_backend_pid();

-- // VIEW EMPLOYEES //
SELECT *
FROM employee;

-- VIEW EMPLOYEES BY MANAGER//
SELECT employee_id, employee_first_name, employee_last_name, manager_id
FROM employee
ORDER BY manager_id;

--  VIEW EMPLOYEES BY DEPARTMENT //
SELECT employee_id, employee_first_name, employee_last_name, CONCAT(employee_first_name, ' ', employee_last_name) 
AS manager_full_name, role_title
FROM employee
ORDER BY role_id;

-- DELETE DEPARTMENT, ROLES AND EMPLOYEES//
DELETE FROM department
WHERE department_id = 1;

DELETE FROM role
WHERE role_id = 1;

DELETE FROM employee
WHERE employee_id = 1;

-- DEPARTMENT INFO //
SELECT department_id, department_name, COUNT(department_id) AS total_employees
FROM department
GROUP BY department;

-- TOTAL SALARY //
SELECT role_id, role_title, role_salary, department_id, SUM(role_salary) AS total_salary
FROM role;

-- EMPLOYEE INFO //
SELECT employee_id, employee_first_name, employee_last_name, role_id, manager_id
FROM employee;




SELECT e.employee_id, e.employee_first_name, e.employee_last_name, CONCAT(m.employee_first_name, ' ', m.employee_last_name) 
AS manager_full_name, r.role_title
FROM employee e
JOIN role r ON e.role_id = r.role_id
LEFT JOIN employee m ON e.manager_id = m.employee_id;