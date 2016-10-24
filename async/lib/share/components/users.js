import React, { Component } from 'react'

import * as API from '../api'

export default class Users extends Component {

  static fetchData(dispatch) {
    return API.fetchUsers(dispatch)
  }

  componentWillMount(a,b,c) {
    const { dispatch, fetched } = this.props
    if (!fetched) {
      API.fetchUsers(dispatch)
    }
  }

  render = () => {
    console.log(this.props)
    const { actions, dispatch, users, pending } = this.props
    return (
      <div>
        <ul>
          {users.map((user, i) =>
            <li key={i}>{user}</li>
           )}
        </ul>
        <form
          onSubmit={(e) => {
              e.preventDefault()
              dispatch(actions.addUser(e.target.elements[0].value))
            }}
        >
          <input />
          <button>add user</button>
        </form>
        <button
          onClick={() => (API.fetchUsers(dispatch))}
        >
          fetch users <span style={{display: pending ? '' : 'none' }}>(loading...)</span>
        </button>
      </div>
    )
  }
}
