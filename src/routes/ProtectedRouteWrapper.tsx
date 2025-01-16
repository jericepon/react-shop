import { RootState } from '@/store/rootState';
import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ProtectedRouteWrapper = (Component: ComponentType) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated && window.location.pathname !== '/login')
  {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && window.location.pathname === '/login')
  {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRouteWrapper