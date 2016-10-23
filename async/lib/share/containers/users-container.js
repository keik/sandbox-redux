import { connect } from 'react-redux'

import Users from '../components/users'
import * as actions from '../actions'
import * as API from '../api'

export default connect(
  (state) => (state.user),
  (dispatch) => ({
    dispatch,
    actions,
    API,
  })
)(Users)
