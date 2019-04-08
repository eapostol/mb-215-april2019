import { createStackNavigator } from 'react-navigation'
import LoginOptionsScreen from '../screens/LoginOptionsScreen'
import LoginWithEmailScreen from '../screens/LoginWithEmailScreen'

const LoginRoutes = createStackNavigator({
  Login: {
    screen: LoginOptionsScreen,
  },
  LoginWithEmail: {
    screen: LoginWithEmailScreen,
  },
},
{
  headerMode: 'none',
})

export default LoginRoutes
