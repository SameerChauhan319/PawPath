import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('pawpaths_user');
    const storedToken = localStorage.getItem('pawpaths_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);

    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('auth-unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth-unauthorized', handleUnauthorized);
    };
  }, []);

  const login = (newToken, userData) => {
    localStorage.setItem('pawpaths_token', newToken);
    localStorage.setItem('pawpaths_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('pawpaths_token');
    localStorage.removeItem('pawpaths_user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData, newToken) => {
    if (newToken) {
      localStorage.setItem('pawpaths_token', newToken);
      setToken(newToken);
    }
    localStorage.setItem('pawpaths_user', JSON.stringify(userData));
    setUser(userData);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
