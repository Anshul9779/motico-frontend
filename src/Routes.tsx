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
import NumberCountry from "./NumberCountry";
import SearchPhoneNumber from "./components/SearchPhoneNumber";
import Teams from "./Teams";
import NewTeam from "./NewTeam";
import Users from "./Users";
import User from "./User";
import NewUser from "./NewUser";
import ResetPassword from "./ResetPassword";
import CallDuration from "./CallDuration";

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
          <Route path="/reset" component={ResetPassword} />
          <PrivateRoute path="/teams/new" redirectTo="/login">
            <NewTeam />
          </PrivateRoute>
          <PrivateRoute path="/users/new" redirectTo="/login">
            <NewUser />
          </PrivateRoute>
          <PrivateRoute path="/users" redirectTo="/login">
            <Users />
          </PrivateRoute>
          <PrivateRoute path="/users/:id" redirectTo="/login">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/teams" redirectTo="/login">
            <Teams />
          </PrivateRoute>
          <PrivateRoute path="/call" redirectTo="/login">
            <Call />
          </PrivateRoute>
          <PrivateRoute path="/live-activity" redirectTo="/login">
            <LiveActivity />
          </PrivateRoute>
          <PrivateRoute path="/call-duration" redirectTo="/login">
            <CallDuration />
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
          <PrivateRoute path="/numbers/search" redirectTo="/login">
            <NumberCountry />
          </PrivateRoute>
          <PrivateRoute path="/numbers/search/:countryCode" redirectTo="/login">
            <SearchPhoneNumber />
          </PrivateRoute>
          <PrivateRoute path="/numbers" redirectTo="/login">
            <Numbers />
          </PrivateRoute>
        </Sidebar>
      </Switch>
    </Router>
  );
}
