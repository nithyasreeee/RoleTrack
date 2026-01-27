import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { load, save } from "../utils/storage";
import { uid } from "../utils/id";

const Ctx = createContext();

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "add":
    case "ADD":
      newState = [...state, { ...action.payload, id: uid(), status: "active", joinedDate: new Date().toISOString() }];
      save("employees", newState);
      return newState;
    
    case "update":
    case "UPDATE":
      newState = state.map(e => e.id === action.id ? { ...e, ...action.payload } : e);
      save("employees", newState);
      return newState;
    
    case "TOGGLE_STATUS":
      newState = state.map(e => 
        e.id === action.payload 
          ? { ...e, status: e.status === "active" ? "inactive" : "active" } 
          : e
      );
      save("employees", newState);
      return newState;
    
    case "DELETE":
      newState = state.filter(e => e.id !== action.payload);
      save("employees", newState);
      return newState;
    
    default:
      return state;
  }
}

export function EmployeeProvider({ children }) {
  const initialData = load("employees");
  const [state, dispatch] = useReducer(reducer, initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  return (
    <Ctx.Provider value={{ employees: state, dispatch, loading, error }}>
      {children}
    </Ctx.Provider>
  );
}

export const useEmployees = () => useContext(Ctx);

// Search, filter, sort, pagination utilities
export const searchEmployees = (employees, query) => {
  if (!query) return employees;
  const lowerQuery = query.toLowerCase();
  return employees.filter(emp =>
    emp.name.toLowerCase().includes(lowerQuery) ||
    emp.email.toLowerCase().includes(lowerQuery) ||
    emp.department.toLowerCase().includes(lowerQuery) ||
    emp.role.toLowerCase().includes(lowerQuery)
  );
};

export const filterEmployees = (employees, filters) => {
  let filtered = [...employees];
  
  if (filters.status) {
    filtered = filtered.filter(e => e.status === filters.status);
  }
  
  if (filters.department) {
    filtered = filtered.filter(e => e.department === filters.department);
  }
  
  if (filters.role) {
    filtered = filtered.filter(e => e.role === filters.role);
  }
  
  return filtered;
};

export const sortEmployees = (employees, sortBy, sortOrder = 'asc') => {
  const sorted = [...employees].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
};

export const paginateEmployees = (employees, page, pageSize = 9) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: employees.slice(start, end),
    totalPages: Math.ceil(employees.length / pageSize),
    currentPage: page,
    total: employees.length
  };
};
