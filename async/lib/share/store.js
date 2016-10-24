import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import { routerReducer } from 'react-router-redux'

import * as reducers from '../share/reducers'

export default function configureStore(initialState) {
  const logger = createLogger()
  return createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    initialState,
    applyMiddleware(logger)
  )
}
