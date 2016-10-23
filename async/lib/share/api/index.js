import * as Actions from '../actions'

export const fetchUsers = (dispatch) => {
  dispatch(Actions.fetchUsersPending())
  return new Promise((resolve, reject) =>
    setTimeout(() =>
      resolve(['Alice', 'Bob', 'Charlie']), 2000))
    .then((users) => dispatch(Actions.fetchUsersResolved(users)))
    .catch((error) => dispatch(Actions.fetchUsersRejected(error)))
}
