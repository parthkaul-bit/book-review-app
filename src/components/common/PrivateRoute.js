// components/common/PrivateRoute.js

import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ path, element: Element }) => {
  const { authState } = useContext(AuthContext);
  const { isAuthenticated } = authState;

  return isAuthenticated ? (
    <Route path={path} element={<Element />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
