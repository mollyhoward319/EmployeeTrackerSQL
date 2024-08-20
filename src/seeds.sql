INSERT INTO department (name)
  VALUES ('Marketing Manager'),
    ('Account Manager'),
    ('Accountant'),
    ('Sales Manager'),
    ('Sales Assistant'),
    ('Sales Coordinator'),
    ('Sales Director'),
    ('Marketing Director'),
    ('Marketing VP'),
    ('Legal Team Lead'),
    ('Lawyer');

INSERT INTO role (department_id, title, salary)
  VALUES (1, 'Marketing Manager', 155700),
        (1, 'Account Manager', 46000),
        (1, 'Accountant', 60000),
        (1, 'Sales Manager', 80000),
        (1, 'Sales Assistant', 35000),
        (1, 'Sales Coordinator', 150000),
        (1, 'Sales Director', 200000),
        (1, 'Marketing Director', 250000),
        (1, 'Marketing VP', 300000),
        (1, 'Legal Team Lead', 350000),
        (1, 'Lawyer', 400000);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('John', 'Doe', 1, NULL),
          ('Jane', 'Schmoe', 2, 1),
          ('Sally', 'Pro', 3, 1),
          ('Jill', 'Crow', 4, 1),
          ('Jack', 'Roe', 5, 1),
          ('Jenny', 'Poe', 6, 1),
          ('Sarah', 'Grow', 7, 1),
          ('Jess', 'Noe', 8, 1),
          ('Bob', 'Low', 9, 1);
        

       