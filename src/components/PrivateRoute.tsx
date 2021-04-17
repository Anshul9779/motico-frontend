import React, { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from "../utils/hooks";

export interface PrivateRouteProps extends RouteProps {
  redirectTo?: string;
  unauthenticatedComponent?: ReactNode;
}

/**
 * This component is used to check if user is logged in or not.
 * Depending on Logged In status, you can Redirect, Show some other component.
 */
export default function PrivateRoute({
  path,
  redirectTo = "/login",
  children,
  unauthenticatedComponent,
  ...rest
}: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : unauthenticatedComponent ? (
          unauthenticatedComponent
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
