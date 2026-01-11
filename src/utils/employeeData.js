// Employee Data Model and Utilities

// Helper to generate unique IDs
let nextId = 1;
function generateId() {
  return nextId++;
}

// Employee record
export function createEmployee({ name, department, role, status = 'Active' }) {
  return {
    id: generateId(),
    name,
    department,
    role,
    status, // 'Active' or 'Inactive'
  };
}

// Search employees by name (case-insensitive)
export function searchEmployees(employees, query) {
  if (!query) return employees;
  return employees.filter(emp =>
    emp.name.toLowerCase().includes(query.toLowerCase())
  );
}

// Filter employees by department and/or status
export function filterEmployees(employees, { department, status }) {
  return employees.filter(emp => {
    const depMatch = department ? emp.department === department : true;
    const statusMatch = status ? emp.status === status : true;
    return depMatch && statusMatch;
  });
}

// Sort employees by field (name, department, status)
export function sortEmployees(employees, field, direction = 'asc') {
  const sorted = [...employees].sort((a, b) => {
    if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

// Manual pagination
export function paginateEmployees(employees, page = 1, pageSize = 10) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return employees.slice(start, end);
}


