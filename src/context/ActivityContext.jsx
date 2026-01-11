import { createContext, useContext, useReducer, useEffect } from "react";
import { load, save } from "../utils/storage";
import { uid } from "../utils/id";

const Ctx = createContext();

// Generate seed data for demo purposes
const generateSeedData = () => {
  const now = new Date();
  const activities = [];
  const descriptions = [
    "Completed project documentation",
    "Team meeting and sprint planning",
    "Code review for pull requests",
    "Fixed critical bug in production",
    "Implemented new feature module",
    "Updated API endpoints",
    "Database optimization tasks",
    "Client presentation preparation",
    "Testing and quality assurance",
    "Research and development"
  ];

  // Generate activities for the past 4 weeks
  for (let week = 0; week < 4; week++) {
    const activitiesPerWeek = Math.floor(Math.random() * 5) + 3; // 3-7 activities per week
    
    for (let i = 0; i < activitiesPerWeek; i++) {
      const daysAgo = (week * 7) + Math.floor(Math.random() * 7);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      
      const statuses = ['pending', 'approved', 'rejected'];
      const statusWeights = [0.2, 0.65, 0.15]; // 20% pending, 65% approved, 15% rejected
      const randomStatus = Math.random();
      let status = 'approved';
      
      if (randomStatus < statusWeights[0]) status = 'pending';
      else if (randomStatus < statusWeights[0] + statusWeights[2]) status = 'rejected';
      
      activities.push({
        id: uid(),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        employeeId: `employee-${Math.floor(Math.random() * 3) + 1}`,
        status: status,
        createdAt: date.toISOString(),
        date: date.toISOString()
      });
    }
  }
  
  return activities;
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      const a = [...state, { 
        ...action.payload, 
        id: uid(), 
        status: "pending",
        createdAt: new Date().toISOString(),
        date: new Date().toISOString()
      }];
      save("activities", a);
      return a;
    case "update":
      const u = state.map(x => x.id === action.id ? { ...x, ...action.payload } : x);
      save("activities", u);
      return u;
    case "init":
      save("activities", action.payload);
      return action.payload;
    default:
      return state;
  }
}

export function ActivityProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, load("activities"));

  // Initialize with seed data if empty
  useEffect(() => {
    if (state.length === 0) {
      const seedData = generateSeedData();
      dispatch({ type: "init", payload: seedData });
    }
  }, []);

  return (
    <Ctx.Provider value={{ activities: state, dispatch }}>
      {children}
    </Ctx.Provider>
  );
}

export const useActivities = () => useContext(Ctx);
