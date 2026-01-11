import { createContext, useContext, useReducer } from "react";
import { load, save } from "../utils/storage";
import { uid } from "../utils/id";

const Ctx = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "add":
      const added = [...state, { ...action.payload, id: uid(), status: "active" }];
      save("employees", added);
      return added;
    default:
      return state;
  }
}

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, load("employees"));

  return (
    <Ctx.Provider value={{ employees: state, dispatch }}>
      {children}
    </Ctx.Provider>
  );
}

export const useEmployees = () => useContext(Ctx);
