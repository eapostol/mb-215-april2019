import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import withProfileCanvas from './withProfileCanvas'
import ProfileCanvas from '../components/ProfileCanvas'


const LeaguesProfileScreen = ({ profileData, currentIndex, onPress, analytics, navigation }) => {
  const tabArray = []
  let tabData = {}

  tabData = {
    profile: {
      summary: (profileData.description) ? profileData.description : '',
    },
    teams: {
      teams: profileData.partitions,
    },
  }
  tabArray.push({ type: 'sport.profile', label: 'Profile', data: tabData.profile })
  tabArray.push({ type: 'leagues.teams', label: 'Teams', data: tabData.teams })

  return (
    <View style={{ flex: 1 }}>
      <ProfileCanvas
        currentIndex={currentIndex}
        profileImage={`entity/${profileData.imagename}`}
        profileName={profileData.name}
        onPress={onPress}
        tabArray={tabArray}
        analyticsProperties={analytics}
        navigation={navigation}
      />
    </View>
  )
}

LeaguesProfileScreen.propTypes = {
  profileData: PropTypes.object.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  analytics: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default withProfileCanvas()(LeaguesProfileScreen)
