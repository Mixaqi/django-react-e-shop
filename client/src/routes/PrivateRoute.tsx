import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated?: string | null;
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isAuthenticated }) => {
  isAuthenticated = localStorage.getItem("user")
  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default PrivateRoute;
