import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class App extends Component {
  render = () => {
    console.log(this.props)
    const { dispatch, users, pending } = this.props
    return (
      <div>
        hello
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
          onClick={() => dispatch(actions.fetchUsers())}
        >
          fetch users <span style={{display: pending ? '' : 'none' }}>(loading...)</span>
        </button>
      </div>
    )
  }
}

export default connect(
  (state) => (state)
)(App)
