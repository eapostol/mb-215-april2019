import { createStackNavigator } from 'react-navigation'
import TeamsScreen from '../screens/TeamsScreen'
import TeamsProfileScreen from '../screens/TeamsProfileScreen'
import AthletesProfileScreen from '../screens/AthletesProfileScreen'

const TeamsRoutes = createStackNavigator({
  Teams: {
    screen: TeamsScreen,
  },
  TeamsProfile: {
    screen: TeamsProfileScreen,
  },
  AthletesProfile: {
    screen: AthletesProfileScreen,
  },
}, {
  headerMode: 'none',
})

export default TeamsRoutes
