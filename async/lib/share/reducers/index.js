import { ADD_USER, FETCH_USERS_PENDING, FETCH_USERS_RESOLVED } from '../actions'

const initialState = {
  users: ['Alice'],
  pending: false
}

export function user(state = initialState, action) {
  console.log(action.type, state)
  switch(action.type) {
    case ADD_USER:
      return Object.assign({}, state, {users: state.users.concat(action.name)})
    case FETCH_USERS_PENDING:
      return Object.assign({}, state, {pending: true})
    case FETCH_USERS_RESOLVED:
      return Object.assign({}, state, {users: action.users, pending: false})
    default:
      return state
  }
}
