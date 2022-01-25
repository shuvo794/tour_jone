import { CircularProgress } from '@mui/material';
import React from 'react';
import { Route, Redirect, } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
const AdminRoute = ({ children, ...rest }) => {
  const { user, admin, adminLoading } = useAuth();

  if (adminLoading) {
    return <CircularProgress sx={{ mt: 50 }} />
  }
  else {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user?.email && admin === true ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
};

export default AdminRoute;