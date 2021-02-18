import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  isManager: boolean;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  name: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signOut(): void;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@WM:token');
    const user = localStorage.getItem('@WM:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ name, password }) => {
    const response = await api.post('session', {
      name,
      password,
    });

    const { token, user } = response.data as AuthState;

    localStorage.setItem('@WM:token', token);
    localStorage.setItem('@WM:user', JSON.stringify(user));
    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@WM:token');
    localStorage.removeItem('@WM:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signOut,
        signIn,
        token: data.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export default AuthContext;
