import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        // if user not exist redirect to login page
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRouter;