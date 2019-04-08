import { createStackNavigator } from 'react-navigation'
import SportsScreen from '../screens/SportsScreen'
import SportsProfileScreen from '../screens/SportsProfileScreen'
import AthletesProfileScreen from '../screens/AthletesProfileScreen'
import LeaguesProfileScreen from '../screens/LeaguesProfileScreen'

const SportsRoutes = createStackNavigator({
  Sports: {
    screen: SportsScreen,
  },
  SportsProfile: {
    screen: SportsProfileScreen,
  },
  AthletesProfile: {
    screen: AthletesProfileScreen,
  },
  LeaguesProfile: {
    screen: LeaguesProfileScreen,
  },
}, {
  headerMode: 'none',
})

export default SportsRoutes
