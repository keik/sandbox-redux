import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import * as actions from '../actions'

function* fetchUser(action) {
  console.log('call fetchUser in saga')
  try {
    const users = yield call(
      (action) =>
        new Promise((resolve, reject) =>
          setTimeout(() =>
            resolve(['Alice', 'Bob', 'Charlie']), 2000)),
      action)
    yield put({type: actions.FETCH_USERS_RESOLVED, users})
  } catch (e) {
    yield put({type: actions.FETCH_USERS_REJECTED, message: e.message})
  }
}

function* mySaga() {
  console.log('start mySaga')
  yield* takeEvery(actions.FETCH_USERS, fetchUser)
}

export default mySaga
