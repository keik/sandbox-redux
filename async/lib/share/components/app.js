import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
  render = () => {
    console.log(this.props)
    const { children } = this.props
    return (
      <div>
        <Link to="/users">/users</Link>
        {children}
      </div>
    )
  }
}
