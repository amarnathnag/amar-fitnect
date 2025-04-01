
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  name?: string;
  email: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');

    if (isAuthenticated && email) {
      setUser({
        name: name || undefined,
        email,
        isAuthenticated: true,
      });
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // For now, simulate authentication
      // In a real app, this would be an API call
      // await authService.login(email, password)
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);

      setUser({
        email,
        isAuthenticated: true
      });

      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // For now, simulate authentication
      // In a real app, this would be an API call
      // await authService.signup(name, email, password)
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);

      setUser({
        name,
        email,
        isAuthenticated: true
      });

      navigate('/profile');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUser(null);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
