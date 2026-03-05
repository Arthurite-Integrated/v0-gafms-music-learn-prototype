'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType } from '@/lib/types';
import { validateCredentials, getUserById } from '@/lib/auth';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth from localStorage
  useEffect(() => {
    const savedUserId = localStorage.getItem('gafms_user_id');
    if (savedUserId) {
      const savedUser = getUserById(savedUserId);
      if (savedUser) {
        setUser(savedUser);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const validatedUser = validateCredentials(email, password);
    if (validatedUser) {
      setUser(validatedUser);
      localStorage.setItem('gafms_user_id', validatedUser.id);
      return;
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gafms_user_id');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
