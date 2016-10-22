export const ADD_USER = 'ADD_USER'
export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING'
export const FETCH_USERS_RESOLVED = 'FETCH_USERS_RESOLVED'
export const FETCH_USERS_REJECTED = 'FETCH_USERS_REJECTED'

export const addUser = name => ({type: ADD_USER, name})
export const fetchUsersPending = () => ({type: FETCH_USERS_PENDING})
export const fetchUsersResolved = (users) => ({type: FETCH_USERS_RESOLVED, users})
export const fetchUsersRejected = (error) => ({type: FETCH_USERS_REJECTED, error})
export const fetchUsers = () => (dispatch, getState) => {
  dispatch(fetchUsersPending())
  return new Promise((resolve, reject) =>
    setTimeout(() =>
      resolve(['Alice', 'Bob', 'Charlie']), 2000))
  .then((users) => dispatch(fetchUsersResolved(users)))
  .catch((error) => dispatch(fetchUsersRejected(error)))
}
