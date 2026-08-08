/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

import axios from 'axios';

/**
 * Configured Axios instance for API calls
 * - Base URL points to backend server
 * - Request interceptor attaches JWT token
 * - Response interceptor handles 401 (auto logout)
 */
const getBaseUrl = () => {
  // If running locally, connect to local backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://127.0.0.1:5000/api';
  }
  // Otherwise, connect to the live production backend on Render
  return 'https://medimatch-bangladesh.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor: Attach JWT Token ───────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('medimatchbd_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor: Handle 401 ────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('medimatchbd_token');
      localStorage.removeItem('medimatchbd_user');
      // Only redirect if not already on login/register page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
