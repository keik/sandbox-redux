import React from 'react'
import { Route } from 'react-router'

import App from '../share/containers/app-container'
import Users from '../share/containers/users-container'

const routes = (
  <Route path="/" component={App}>
    <Route path="users" component={Users} />
  </Route>
)

export default routes
