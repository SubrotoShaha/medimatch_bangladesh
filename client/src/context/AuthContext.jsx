/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

const AuthContext = createContext(null);

/**
 * AuthProvider component
 * Manages authentication state: user, token, login, register, logout
 * Persists auth state in localStorage
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ─── Load auth state from localStorage on mount ──────────
  useEffect(() => {
    const savedToken = localStorage.getItem('medimatchbd_token');
    const savedUser = localStorage.getItem('medimatchbd_user');

    if (savedToken && savedUser) {
      try {
        // Check if token is expired
        const decoded = jwtDecode(savedToken);
        const now = Date.now() / 1000;

        if (decoded.exp > now) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        } else {
          // Token expired — clear storage
          localStorage.removeItem('medimatchbd_token');
          localStorage.removeItem('medimatchbd_user');
        }
      } catch {
        localStorage.removeItem('medimatchbd_token');
        localStorage.removeItem('medimatchbd_user');
      }
    }
    setLoading(false);
  }, []);

  // ─── Login ───────────────────────────────────────────────
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('medimatchbd_token', data.token);
    localStorage.setItem('medimatchbd_user', JSON.stringify(data.user));
    return data;
  };

  // ─── Register ────────────────────────────────────────────
  const register = async (name, email, password, role) => {
    const { data } = await api.post('/auth/register', { name, email, password, role });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('medimatchbd_token', data.token);
    localStorage.setItem('medimatchbd_user', JSON.stringify(data.user));
    return data;
  };

  // ─── Logout ──────────────────────────────────────────────
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('medimatchbd_token');
    localStorage.removeItem('medimatchbd_user');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use the Auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
