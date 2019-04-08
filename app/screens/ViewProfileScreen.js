import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const LogoutScreen = (props) => {
  const { loginResponse, navigation } = props
  const userId = loginResponse.loginReducer.loginResponse.accountInfo.id
  if (loginResponse.loginReducer.isLoggedIn) {
    return (
      navigation.navigate('AthletesProfile', { id: userId, isEdit: true })
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

export default connect(mapStateToProps)(LogoutScreen)
