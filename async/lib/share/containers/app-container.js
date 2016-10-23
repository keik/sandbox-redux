import { connect } from 'react-redux'

import App from '../components/app'
import * as actions from '../actions'
import * as API from '../api'

export default connect(
  (state) => (state),
  (dispatch) => ({
    dispatch,
    actions,
    API,
  })
)(App)
