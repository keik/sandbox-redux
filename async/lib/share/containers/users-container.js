import { connect } from 'react-redux'

import Users from '../components/users'
import * as actions from '../actions'

export default connect(
  (state) => (state.user),
  (dispatch) => ({
    dispatch,
    actions,
  })
)(Users)
