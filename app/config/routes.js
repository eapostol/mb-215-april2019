import { createAppContainer, createDrawerNavigator } from 'react-navigation'
import { Dimensions } from 'react-native'
import LevelPlayDrawerContentComponent from '../components/LevelPlayDrawerContentComponent'
import HomeScreen from '../screens/HomeScreen'
import LeaguesRoutes from './LeaguesRoutes'
import TeamsRoutes from './TeamsRoutes'
import AthletesRoutes from './AthletesRoutes'
import SportsRoutes from './SportsRoutes'
import LoginRoutes from './LoginRoutes'
import LogoutScreen from '../screens/LogoutScreen'
import ViewProfileScreen from '../screens/ViewProfileScreen'

const MyApp = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    Sports: {
      screen: SportsRoutes,
    },
    Leagues: {
      screen: LeaguesRoutes,
    },
    Teams: {
      screen: TeamsRoutes,
    },
    Athletes: {
      screen: AthletesRoutes,
    },
    'Edit Profile': {
      screen: ViewProfileScreen,
    },
    Login: {
      screen: LoginRoutes,
    },
    Logout: {
      screen: LogoutScreen,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: LevelPlayDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerPosition: 'right',
    drawerWidth: Dimensions.get('window').width / 2,
  },
)
const AppContainer = createAppContainer(MyApp)

export default AppContainer
