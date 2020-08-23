import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  isManager: boolean;
}
interface Response {
  members: User[];
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
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  usersInTheTeam(): Promise<User[]>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Intranett:token');
    const user = localStorage.getItem('@Intranett:user');

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

    localStorage.setItem('@Intranett:token', token);
    localStorage.setItem('@Intranett:user', JSON.stringify(user));
    setData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@Intranett:token');
    localStorage.removeItem('@Intranett:user');
    setData({} as AuthState);
  }, []);

  const usersInTheTeam = useCallback(async () => {
    const response = await api.get<Response>(`/team/${data.user.id}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    const users = response.data.members;
    return users;
  }, [data.token, data.user]);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signOut,
        usersInTheTeam,
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
