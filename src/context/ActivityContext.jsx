import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { load, save } from "../utils/storage";
import { uid } from "../utils/id";

const Ctx = createContext();

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "ADD":
      newState = [
        ...state,
        {
          id: uid(),
          ...action.payload,
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      save("activities", newState);
      return newState;

    case "UPDATE":
      newState = state.map((a) =>
        a.id === action.payload.id
          ? { ...a, ...action.payload, updatedAt: new Date().toISOString() }
          : a
      );
      save("activities", newState);
      return newState;

    case "APPROVE":
      newState = state.map((a) =>
        a.id === action.payload.id
          ? { 
              ...a, 
              status: "approved", 
              remarks: action.payload.remarks || "",
              approvedBy: action.payload.approvedBy,
              updatedAt: new Date().toISOString() 
            }
          : a
      );
      save("activities", newState);
      return newState;

    case "REJECT":
      newState = state.map((a) =>
        a.id === action.payload.id
          ? { 
              ...a, 
              status: "rejected", 
              remarks: action.payload.remarks || "",
              rejectedBy: action.payload.rejectedBy,
              updatedAt: new Date().toISOString() 
            }
          : a
      );
      save("activities", newState);
      return newState;

    case "DELETE":
      newState = state.filter((a) => a.id !== action.payload);
      save("activities", newState);
      return newState;

    default:
      return state;
  }
}

export function ActivityProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, load("activities"));
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
    <Ctx.Provider value={{ activities: state, dispatch, loading, error }}>
      {children}
    </Ctx.Provider>
  );
}

export const useActivities = () => useContext(Ctx);

// Filter utilities
export const filterActivities = (activities, filters) => {
  let filtered = [...activities];

  if (filters.employeeId) {
    filtered = filtered.filter(a => a.employeeId === filters.employeeId);
  }

  if (filters.status) {
    filtered = filtered.filter(a => a.status === filters.status);
  }

  if (filters.startDate) {
    filtered = filtered.filter(a => new Date(a.date) >= new Date(filters.startDate));
  }

  if (filters.endDate) {
    filtered = filtered.filter(a => new Date(a.date) <= new Date(filters.endDate));
  }

  return filtered;
};

export const paginateActivities = (activities, page, pageSize = 10) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: activities.slice(start, end),
    totalPages: Math.ceil(activities.length / pageSize),
    currentPage: page,
    total: activities.length
  };
};
