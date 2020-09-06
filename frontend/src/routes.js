import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Users from './pages/Users'
import UsersContacts from './pages/UsersContacts'

export default props => (
  <HashRouter>
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/orders' component={ Orders } />
        <Route exact path='/products' component={ Products } />
        <Route exact path='/users' component={ Users } />
        <Route exact path='/users-contacts' component={ UsersContacts } />
      </Switch>
  </HashRouter>
)