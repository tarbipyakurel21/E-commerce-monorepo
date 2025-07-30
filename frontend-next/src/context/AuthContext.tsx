'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  loginUser,
  registerUser,
  logoutUser,
  validateUser,
  handleOAuthSuccess,
  refreshToken,
  LoginRequest,
  RegisterRequest,
} from '@/services/auth';

type User = {
  username: string;
  role: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  oauthLogin: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Validate user on first load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await validateUser();
        setUser({ username: res.data.username, role: String(res.data.role) });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (data: LoginRequest) => {
    await loginUser(data);
    const res = await validateUser();
    setUser({ username: res.data.username, role: String(res.data.role) });
  };

  const register = async (data: RegisterRequest) => {
    await registerUser(data);
    const res = await validateUser();
    setUser({ username: res.data.username, role: String(res.data.role) });
    router.push('/');
  };

  const oauthLogin = async () => {
    await handleOAuthSuccess(); // backend sets cookies
    const res = await validateUser();
    setUser({ username: res.data.username, role: String(res.data.role) });
    router.push('/');
  };

  const refreshSession = async () => {
    try {
      await refreshToken(''); // token in cookie
      const res = await validateUser();
      setUser({ username: res.data.username, role: String(res.data.role) });
    } catch (err) {
      console.error('Refresh failed', err);
      logout(); // fallback
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, oauthLogin, refreshSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
