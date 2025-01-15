import { ComponentType } from 'react';
import { Navigate } from 'react-router';

const isAuthenticated = () => {
  return false;
};

const ProtectedRouteWrapper = (Component: ComponentType) => {
  if (!isAuthenticated())
  {
    return <Navigate to="/login" replace />;
  }
  return <Component />;
};

export default ProtectedRouteWrapper