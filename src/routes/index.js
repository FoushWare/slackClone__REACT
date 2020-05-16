/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import decode from 'jwt-decode';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ViewTeam from './ViewTeam';
import DirectMessages from './DirectMessages';
import CreateTeam from './CreateTeam';




// check if the token in valid or not
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }
  return true;
};
// Redirect to the login if the token is invalid
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    ))}
  />
);
/**
 * With react-router-dom , we designate a dynamic portion of the URL 
 * to be matched by putting a colon ( : ) before it
 */
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/view-team/:teamId?/:channelId?" exact component={ViewTeam} />
      <PrivateRoute path="/view-team/user/:teamId/:userId" exact component={DirectMessages} />
      <PrivateRoute path="/create-team" exact component={CreateTeam} />
    </Switch>
  </BrowserRouter>
);
