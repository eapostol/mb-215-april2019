import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import withProfileCanvas from './withProfileCanvas'
import ProfileCanvas from '../components/ProfileCanvas'


const AthletesProfileScreen = ({ profileData, currentIndex, onPress, analytics, navigation, isEdit }) => {
  const tabArray = []
  let tabData = {}

  tabData = {
    profile: {
      summary: profileData.profile.summary,
    },
    sportsAndTeams: {
      sports: profileData.sports,
      teams: profileData.teams,
    },
    acclaim: {
      summary: profileData.profile.acclaim,
    },
  }

  tabArray.push({ type: 'sport.profile', label: 'profile', data: tabData.profile })
  tabArray.push({ type: 'athlete.sportsAndTeams', label: 'sports/teams', data: tabData.sportsAndTeams })
  if (tabData.acclaim.summary) {
    tabArray.push({ type: 'sport.profile', label: 'acclaim', data: tabData.acclaim })
  }

  return (
    <View style={{ flex: 1 }}>
      <ProfileCanvas
        currentIndex={currentIndex}
        profileImage={`participant/${profileData.profile.imagePath}`}
        profileName={`${profileData.profile.firstName} ${profileData.profile.lastName}`}
        onPress={onPress}
        tabArray={tabArray}
        analyticsProperties={analytics}
        navigation={navigation}
        isEdit={isEdit}
      />
    </View>
  )
}

AthletesProfileScreen.propTypes = {
  profileData: PropTypes.object.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  analytics: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
}

export default withProfileCanvas()(AthletesProfileScreen)
