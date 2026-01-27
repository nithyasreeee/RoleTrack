import axios from '../config/axios';

// ============================================
// Authentication APIs
// ============================================

export const authAPI = {
  // Login
  login: async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    const response = await axios.put('/auth/update-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
  },
};

// ============================================
// Employee APIs
// ============================================

export const employeeAPI = {
  // Get all employees with filters
  getEmployees: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`/employees?${queryString}`);
    return response.data;
  },

  // Get single employee
  getEmployee: async (id) => {
    const response = await axios.get(`/employees/${id}`);
    return response.data;
  },

  // Create employee
  createEmployee: async (employeeData) => {
    const response = await axios.post('/employees', employeeData);
    return response.data;
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    const response = await axios.put(`/employees/${id}`, employeeData);
    return response.data;
  },

  // Delete employee
  deleteEmployee: async (id) => {
    const response = await axios.delete(`/employees/${id}`);
    return response.data;
  },

  // Get employee statistics
  getStats: async () => {
    const response = await axios.get('/employees/stats');
    return response.data;
  },
};
