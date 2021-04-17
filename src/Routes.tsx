import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./Login";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" redirectTo="/login">
          <div>
            <h2>Logged In</h2>
          </div>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
