import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';

interface PrivateRouteProps {
  component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const isAuthenticated = useAppSelector((state: RootState) => !!state.auth);
  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Navigate to='/unauthorized' />;
  }
};

export default PrivateRoute;
