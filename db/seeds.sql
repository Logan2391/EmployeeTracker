INSERT INTO department (name)
VALUES 
("IT"),
("Sales & Marketing"),
("Accounting"),
("Operations");

INSERT INTO role (title, salary, department_id)
VALUES
("Front-End Developer", 70000, 1),
("Back-End Developer", 85000, 1),
("Full-Stack Developer", 95000, 1),
("Marketing Coordindator", 75000, 2),
("Sales Person", 60000, 2),
("Sales Lead", 90000, 2),
("Accountant", 40000, 3),
("Financial Analyst", 90000, 3),
("Sales Manager", 100000, 4),
("Project Manager", 120000, 4),
("Account Manager", 120000, 4),
("Operations Manager", 160000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Tim", "Bob", 12, null),
("John", "Smith", 11, null),
("Steve", "Joe", 10, null),
("Joel", "Martin", 9, null),
("Billy", "Bob", 1, 3),
('Hynda', 'Foster', 2, 3),
('Emmye', 'Gogerty', 3, 3),
('Darwin', 'Faber', 4, 2),
('Pietrek', 'Adshed', 5, 2),
('Karla', 'Germain', 6, 2),
('Philippe', 'Robez', 7, 4),
('Henriette', 'Claxson', 8, 4);