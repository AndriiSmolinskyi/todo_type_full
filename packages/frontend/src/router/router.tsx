import React from 'react';
import { Routes } from 'react-router-dom';
import { useAuthStore } from '~store/auth.store';
import { publicRoutes, privateRoutes } from './routes'; 
import Header from '~shared/components/header/header';

const AppRouter: React.FunctionComponent = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div>
      <Header />
      <Routes>
        {isAuthenticated ? privateRoutes : publicRoutes}
      </Routes>
    </div>
  );
};

export default AppRouter;