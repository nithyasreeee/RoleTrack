import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ActivityProvider } from "./context/ActivityContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <EmployeeProvider>
        <ActivityProvider>
          <App />
        </ActivityProvider>
      </EmployeeProvider>
    </AuthProvider>
  </BrowserRouter>
);
