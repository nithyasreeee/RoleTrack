import axios from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        
        case 403:
          // Forbidden - user doesn't have permission
          console.error('Access denied:', data.message);
          break;
        
        case 404:
          console.error('Resource not found:', data.message);
          break;
        
        case 500:
          console.error('Server error:', data.message);
          break;
        
        default:
          console.error('Error:', data.message || 'Something went wrong');
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
