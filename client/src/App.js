import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import LogOut from "./components/logout";
import RegisterForm from "./components/registerForm";
import HomePage from "./components/homePage";
import PasswordResetForm from "./components/resetPasswordForm";
import PasswordResetReceivedForm from "./components/passResetReceivedForm";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="container-fluid">
          <Switch>
            <Route
              path="/users/reset_password_received/:userId/:token"
              render={({ match }) => (
                <PasswordResetReceivedForm
                  userId={match.params.userId}
                  token={match.params.token}
                />
              )}
            />
            <Route
            path="/dashboard"
            render={() => (user ? <Dashboard /> : <Redirect to="/login" />)}
          />
            <Route path="/users/reset_password" component={PasswordResetForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={LogOut} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/profile" component={Profile} />
            <Route
              path="/"
              render={() => <HomePage user={this.state.user} />}
            />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
