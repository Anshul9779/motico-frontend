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
          <Header />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/" redirectTo="/login">
            <Dashboard />
          </PrivateRoute>
        </Sidebar>
      </Switch>
    </Router>
  );
}
