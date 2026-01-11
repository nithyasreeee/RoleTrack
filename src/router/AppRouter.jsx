import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/admin" element={
        <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
      }/>

      <Route path="/manager" element={
        <ProtectedRoute role="manager"><ManagerDashboard /></ProtectedRoute>
      }/>

      <Route path="/employee" element={
        <ProtectedRoute role="employee"><EmployeeDashboard /></ProtectedRoute>
      }/>
    </Routes>
  );
}
