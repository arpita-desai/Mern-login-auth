import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import "./App.css";

import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;

  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./signin";
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          {/* <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch> */}
          <Box mt={5}>
            <Footer />
          </Box>
        </Router>
      </Provider>
    );
  }
}

export default App;
