import { createContext, useContext, useReducer, useEffect } from "react";
import { load, save } from "../utils/storage";
import { uid } from "../utils/id";

const Ctx = createContext();

// Generate seed employee data
const generateSeedEmployees = () => {
  const names = [
    { name: "John Smith", department: "Engineering", role: "Senior Developer" },
    { name: "Sarah Johnson", department: "Marketing", role: "Marketing Manager" },
    { name: "Michael Chen", department: "Engineering", role: "DevOps Engineer" },
    { name: "Emily Rodriguez", department: "Design", role: "UI/UX Designer" },
    { name: "David Kim", department: "Engineering", role: "Backend Developer" },
    { name: "Lisa Anderson", department: "Sales", role: "Sales Representative" },
    { name: "James Wilson", department: "HR", role: "HR Specialist" },
    { name: "Maria Garcia", department: "Engineering", role: "Frontend Developer" }
  ];

  const statuses = ['active', 'active', 'active', 'active', 'active', 'active', 'inactive'];

  return names.map((emp, idx) => ({
    id: uid(),
    name: emp.name,
    department: emp.department,
    role: emp.role,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    email: `${emp.name.toLowerCase().replace(' ', '.')}@roletrack.com`,
    joinedDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
  }));
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      const added = [...state, { 
        ...action.payload, 
        id: uid(), 
        status: "active",
        joinedDate: new Date().toISOString()
      }];
      save("employees", added);
      return added;
    case "update":
      const updated = state.map(x => x.id === action.id ? { ...x, ...action.payload } : x);
      save("employees", updated);
      return updated;
    case "init":
      save("employees", action.payload);
      return action.payload;
    default:
      return state;
  }
}

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, load("employees"));

  // Initialize with seed data if empty
  useEffect(() => {
    if (state.length === 0) {
      const seedData = generateSeedEmployees();
      dispatch({ type: "init", payload: seedData });
    }
  }, []);

  return (
    <Ctx.Provider value={{ employees: state, dispatch }}>
      {children}
    </Ctx.Provider>
  );
}

export const useEmployees = () => useContext(Ctx);
