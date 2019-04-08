import { createStackNavigator } from 'react-navigation'
import LeaguesScreen from '../screens/LeaguesScreen'
import LeaguesProfileScreen from '../screens/LeaguesProfileScreen'
import TeamsProfileScreen from '../screens/TeamsProfileScreen'
import SportsProfileScreen from '../screens/SportsProfileScreen'

const LeaguesRoutes = createStackNavigator({
  Leagues: {
    screen: LeaguesScreen,
  },
  LeaguesProfile: {
    screen: LeaguesProfileScreen,
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

export default LeaguesRoutes
