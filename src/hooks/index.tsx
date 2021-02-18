import React from 'react';
import { AuthProvider } from './auth';
import { DataProvider } from './useData';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <DataProvider>{children}</DataProvider>
    </AuthProvider>
  );
};

export default AppProvider;
