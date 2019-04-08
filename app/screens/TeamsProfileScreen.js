import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import withProfileCanvas from './withProfileCanvas'
import ProfileCanvas from '../components/ProfileCanvas'

const TeamsProfileScreen = ({ profileData, currentIndex, onPress, analytics, navigation }) => {
  const tabArray = []
  let tabData = {}

  tabData = {
    profile: {
      summary: (profileData.teamdescription) ? profileData.teamdescription : '',
    },
    players: {
      players: profileData.athletes,
    },
  }
  tabArray.push({ type: 'sport.profile', label: 'profile', data: tabData.profile })
  tabArray.push({ type: 'teams.players', label: 'players', data: tabData.players })

  const teamData = profileData.team

  return (
    <View style={{ flex: 1 }}>
      <ProfileCanvas
        currentIndex={currentIndex}
        profileImage={`team/${teamData.teamimage}`}
        profileName={`${teamData.locale} ${teamData.teamname}`}
        onPress={onPress}
        tabArray={tabArray}
        analyticsProperties={analytics}
        navigation={navigation}
      />
    </View>
  )
}

TeamsProfileScreen.propTypes = {
  profileData: PropTypes.object.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  analytics: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default withProfileCanvas()(TeamsProfileScreen)
