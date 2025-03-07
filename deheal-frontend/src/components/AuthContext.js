// src/components/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

// Provider component to wrap the app
export const AuthProvider = ({ children }) => {
  // Use a simple state for authentication (initially false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulated login function (replace with your real auth logic)
  const login = (credentials) => {
    // Verify credentials (e.g., via API)
    // If success:
    setIsAuthenticated(true);
  };

  // Simulated logout function
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming auth context
export const useAuth = () => useContext(AuthContext);

// PrivateRoute component
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
