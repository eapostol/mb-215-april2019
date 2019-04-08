import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutRequest } from '../redux/actions/loginActions'

const LogoutScreen = (props) => {
  const { loginResponse, navigation, logoutRequest } = props
  if (loginResponse.loginReducer.isLoggedIn) {
    logoutRequest()
    return (
      navigation.navigate('Home')
    )
  }
  return (
    navigation.navigate('Home')
  )
}

LogoutScreen.propTypes = {
  logoutRequest: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  loginResponse: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({ loginResponse: state })

export default connect(mapStateToProps, { logoutRequest })(LogoutScreen)