DROP DATABASE IF EXISTS inventory_db;
CREATE DATABASE inventory_db;

\c inventory_db;

CREATE TABLE department (
  -- Creates a numeric column called "id" --
  id SERIAL PRIMARY KEY,
  -- Creates a string column called "name" which can hold up to 100 characters --
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE role (
  -- Creates a numeric column called "id" --
  id SERIAL PRIMARY KEY,
  -- Creates a string column called "name" which can hold up to 100 characters --
  title VARCHAR(100) UNIQUE NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INTEGER NOT NULL,

  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  -- Creates a numeric column called "id" --
  id SERIAL PRIMARY KEY,
  -- Creates a string column called "name" which can hold up to 100 characters --
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,

  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);
