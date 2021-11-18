INSERT INTO departments (department_name)
VALUES  ("IT"),
        ("Marketing"),
        ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Manager", 150000, 1),
        ("Applications Developer", 80000, 1),
        ("Manager", 120000, 2),
        ("Manager", 170000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Omar", "Pacheco", 1, NULL),
        ("Nik", "Srini", 2, 1);