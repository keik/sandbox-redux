import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'

import * as reducers from '../share/reducers'
import App from '../share/containers/app-container'
import Users from '../share/containers/users-container'

const logger = createLogger()
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(logger)
)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="users" component={Users} />
      </Route>
    </Router>
  </Provider>,
  global.document.getElementById('app'))
