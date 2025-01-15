import { RootState } from '@/store';
import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ProtectedRouteWrapper = (Component: ComponentType) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated)
  {
    return <Navigate to="/login" replace />;
  }
  return <Component />;
};

export default ProtectedRouteWrapper