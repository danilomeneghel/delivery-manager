import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Users from './pages/Users'
import UsersContacts from './pages/UsersContacts'
import { isAuthenticated } from "./services/auth";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { logout } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

export default props => (
  <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect exact from="/logout" to="/login" component={logout} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path='/' component={ Home } />
        <PrivateRoute exact path='/orders' component={ Orders } />
        <PrivateRoute exact path='/products' component={ Products } />
        <PrivateRoute exact path='/users' component={ Users } />
        <PrivateRoute exact path='/users-contacts' component={ UsersContacts } />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
  </BrowserRouter>
)