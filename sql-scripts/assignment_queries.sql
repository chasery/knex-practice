-- How many people work in the Sales department?
SELECT
	d.dept_name as department,
	COUNT(*) AS employee_count
FROM
  employee e
  INNER JOIN
  department d
  ON e.department = d.id
GROUP BY d.dept_name 
HAVING 
  d.dept_name = 'Sales';

-- List the names of all employees assigned to the 'Plan Christmas party' project.
SELECT
  e.emp_name as employee_name,
FROM
  employee e
  INNER JOIN
  employee_project ep
  ON e.id = ep.emp_id
  INNER JOIN
  project p
  ON ep.project_id = p.id
WHERE
  p.project_name = 'Plan Christmas party';

-- List the names of employees from the Warehouse department that are assigned to the 'Watch paint dry' project.
-- This returns no one. I believe this is expected as the only employee within my employee table who is in the department 'Warehouse' is Meredith.
SELECT
  e.emp_name AS employee_name
FROM
  employee e
  INNER JOIN
  department d
  ON e.department = d.id
  INNER JOIN
  employee_project ep
  ON e.id = ep.emp_id
  INNER JOIN
  project p
  ON ep.project_id = p.id
WHERE
  p.project_name = 'Watch paint dry' AND d.dept_name = 'Warehouse';

-- Which projects are the Sales department employees assigned to?
SELECT 
  e.emp_name as employee_name,
  p.project_name as project
FROM
  employee e
  INNER JOIN
  department d
  ON e.department = d.id
  INNER JOIN
  employee_project ep
  ON e.id = ep.emp_id
  INNER JOIN
  project p
  ON ep.project_id = p.id
WHERE
  d.dept_name = 'Sales';

-- List only the managers that are assigned to the 'Watch paint dry' project.
-- I think this is right? haha.
SELECT
  e.emp_name as Manager
FROM
  employee e
  INNER JOIN
  department d
  ON e.department = d.id
  INNER JOIN
  employee_project ep
  ON e.id = ep.emp_id
  INNER JOIN
  project p
  ON ep.project_id = p.id
WHERE
  e.id = d.manager AND p.project_name = 'Watch paint dry';