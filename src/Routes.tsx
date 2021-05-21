import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "./utils/hooks";
import Sidebar from "react-sidebar";
import UserSidebar from "./components/Sidebar/UserSidebar";
import Header from "./components/Header/Header";
import Dashboard from "./Dashboard";
import CallSummary from "./CallSummary";
import Analytics from "./Analytics";
import LiveActivity from "./LiveActivity";
import Call from "./Call";
import Numbers from "./Numbers";

export default function Routes() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Switch>
        <Sidebar
          sidebar={<UserSidebar />}
          docked={isAuthenticated}
          styles={{
            sidebar: {
              backgroundColor: "#2B3144",
              boxShadow: "none",
              maxWidth: "15vw",
              width: "15vw",
              borderRadius: "0 0.3rem 0.3rem 0",
            },
            content: {
              backgroundColor: "#F2F6F7",
            },
          }}
        >
          {isAuthenticated && <Header />}
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/call" redirectTo="/login">
            <Call />
          </PrivateRoute>
          <PrivateRoute path="/live-activity" redirectTo="/login">
            <LiveActivity />
          </PrivateRoute>
          <PrivateRoute path="/analytics" redirectTo="/login">
            <Analytics />
          </PrivateRoute>
          <PrivateRoute path="/call-summary" redirectTo="/login">
            <CallSummary />
          </PrivateRoute>
          <PrivateRoute path="/" redirectTo="/login">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/numbers" redirectTo="/login">
            <Numbers />
          </PrivateRoute>
        </Sidebar>
      </Switch>
    </Router>
  );
}
