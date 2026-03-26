import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { toast } from 'sonner';
import api from '../lib/axios';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  picture?: string;
  googleId?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const saveUser = useCallback((userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  }, []);

  // Safe JSON parsing helper
  const safeJson = async (response: Response, endpoint: string): Promise<any> => {
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API ${endpoint} failed [${response.status}]:`, errorText);
      throw new Error(errorText.substring(0, 200) || `HTTP ${response.status}`);
    }
    const data = await response.json();
    console.log(`API ${endpoint} success:`, data);
    return data;
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        clearUser();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (name: string, email: string, password: string, phone?: string) => {
    setIsLoading(true);

    try {
      console.log('Register request:', { name, email });
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await safeJson(response, 'register');

      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      saveUser(data.user);
      toast.success('Registration successful!');
    } catch (error: any) {
      console.error('Register error:', error);
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      console.log('Login request:', { email });
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await safeJson(response, 'login');

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      saveUser(data.user);
      toast.success('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    console.log('JWT logout - clearing client state');
    clearUser();
    toast.success('Logged out successfully!');
  };

  const googleLogin = async () => {
    setIsLoading(true);

    try {
      console.log('Google login initiating...');
      const response = await fetch('./backend/google-login.php', {
        method: 'GET',
        credentials: 'omit',
      });

      const data = await safeJson(response, 'google-login');

      if (!data.success || !data.auth_url) {
        throw new Error(data.message || 'Google login failed');
      }

      window.location.href = data.auth_url;
    } catch (error: any) {
      console.error('Google login error:', error);
      toast.error(error.message || 'Google login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    googleLogin,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
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

export const useGoogleLogin = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useGoogleLogin must be used within an AuthProvider');
  }

  return context.googleLogin;
};

