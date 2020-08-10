import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "green"
  }
}));

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const classes = useStyles;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={this.onChange}
                  value={this.state.firstname}
                  error={errors.firstname}
                  type="text"
                  autoComplete="firstname"
                  name="firstname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
              </Grid>
              <span className="red-text">{errors.firstname}</span>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={this.onChange}
                  value={this.state.lastname}
                  error={errors.lastname}
                  type="text"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lastname"
                  className={classnames("", {
                    invalid: errors.lastname
                  })}
                />
              </Grid>
              <span className="red-text">{errors.lastname}</span>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
              </Grid>
              <span className="red-text">{errors.email}</span>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
              </Grid>
              <span className="red-text">{errors.password}</span>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  value={this.state.confirmPassword}
                  error={errors.confirmPassword}
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  className={classnames("", {
                    invalid: errors.confirmPassword
                  })}
                />
              </Grid>
              <span className="red-text">{errors.confirmPassword}</span>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withRouter(SignUp));
