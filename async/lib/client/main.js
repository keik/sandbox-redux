import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import reducers from '../share/reducers'
import App from '../share/containers/app-container'

const logger = createLogger()
const store = createStore(
  reducers,
  applyMiddleware(logger)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  global.document.getElementById('app'))
