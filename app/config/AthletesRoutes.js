import { createStackNavigator } from 'react-navigation'
import AthletesScreen from '../screens/AthletesScreen'
import AthletesProfileScreen from '../screens/AthletesProfileScreen'
import TeamsProfileScreen from '../screens/TeamsProfileScreen'
import SportsProfileScreen from '../screens/SportsProfileScreen'

const AthletesRoutes = createStackNavigator({
  Athletes: {
    screen: AthletesScreen,
  },
  AthletesProfile: {
    screen: AthletesProfileScreen,
  },
  TeamsProfile: {
    screen: TeamsProfileScreen,
  },
  SportsProfile: {
    screen: SportsProfileScreen,
  },
}, {
  headerMode: 'none',
})

export default AthletesRoutes
