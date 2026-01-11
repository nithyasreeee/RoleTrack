import { createContext, useContext, useReducer } from "react";
import { load, save } from "../utils/storage";
import { uid } from "../utils/id";

const Ctx = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "add":
      const a = [...state, { ...action.payload, id: uid(), status: "pending" }];
      save("activities", a);
      return a;
    case "update":
      const u = state.map(x => x.id === action.id ? { ...x, ...action.payload } : x);
      save("activities", u);
      return u;
    default:
      return state;
  }
}

export function ActivityProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, load("activities"));

  return (
    <Ctx.Provider value={{ activities: state, dispatch }}>
      {children}
    </Ctx.Provider>
  );
}

export const useActivities = () => useContext(Ctx);
