import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ActivityProvider } from "./context/ActivityContext";
import { ThemeProvider } from "./context/ThemeContext";

// Prevent transitions on page load
document.documentElement.classList.add('preload');
window.addEventListener('load', () => {
  setTimeout(() => {
    document.documentElement.classList.remove('preload');
  }, 100);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <EmployeeProvider>
        <ActivityProvider>
          <ThemeProvider>
               <App />
          </ThemeProvider>
        
        </ActivityProvider>
      </EmployeeProvider>
    </AuthProvider>
  </BrowserRouter>
);
