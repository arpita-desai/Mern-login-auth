import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
//import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";

import PrivateRoute from "./private-route/PrivateRoute";
import Dashboard from "./dashboard/Dashboard";

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  }
}));

function Header() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Learn MERN
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              to="/"
              className={classes.link}
            >
              Home
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              to="/signin"
              className={classes.link}
            >
              Sign In
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              to="/signup"
              className={classes.link}
            >
              Sign Up
            </Link>
          </nav>
        </Toolbar>
      </AppBar>

      {/* <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch> */}
    </React.Fragment>
  );
}

export default Header;
