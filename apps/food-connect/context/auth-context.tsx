'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authApi } from '@/lib/auth-api';

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
  login: (userData: User, token: string, refreshToken: string) => void;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('auth_token');
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((userData: User, authToken: string, refreshToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    authApi.setStoredToken(authToken, refreshToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    authApi.logout();
  }, []);

  const updateProfile = useCallback((userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, token, login, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
