import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route} from 'react-router-dom';
import { selectAuth } from '../store/slices/authSlice';

interface PrivateRouteProps{
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const { user } = useSelector(selectAuth);

  return user ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
