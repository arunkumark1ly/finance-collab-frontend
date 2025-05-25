import React, { createContext, useContext, useState } from 'react';
import api from '../api/axios'; // Import your Axios instance
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      const response = await api.delete('/users/sign_out');

      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/'); // Redirect to the root page after logout
      } else {
        console.error('Logout failed:', response.statusText); // Handle error
      }
    } catch (error) {
      console.error('Logout error:', error); // Handle any errors
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
