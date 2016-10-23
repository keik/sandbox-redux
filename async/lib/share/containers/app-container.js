import { connect } from 'react-redux'

import App from '../components/app'
import * as actions from '../actions'

export default connect(
  (state) => (state.user),
  (dispatch) => ({
    dispatch,
    actions,
  })
)(App)
