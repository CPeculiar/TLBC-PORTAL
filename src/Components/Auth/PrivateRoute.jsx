import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
