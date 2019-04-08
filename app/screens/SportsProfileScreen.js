import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import withProfileCanvas from './withProfileCanvas'
import ProfileCanvas from '../components/ProfileCanvas'


const SportsProfileScreen = ({ profileData, currentIndex, onPress, analytics, navigation }) => {
  const tabArray = []
  let tabData = {}

  // for testing only
  tabData = {
    profile: {
      summary: (profileData.sportsummary) ? profileData.sportsummary : '',
    },
    leagues: {
      leagues: profileData.leagueArray,
    },
    athletes: {
      athletes: profileData.athleteList,
    },
  }
  tabArray.push({ type: 'sport.profile', label: 'Profile', data: tabData.profile })
  if (profileData.category === 'Team') tabArray.push({ type: 'sport.league', label: 'Leagues', data: tabData.leagues })
  if (profileData.category === 'Individual') tabArray.push({ type: 'sport.athlete', label: 'Athletes', data: tabData.athletes })

  return (
    <View style={{ flex: 1 }}>
      <ProfileCanvas
        currentIndex={currentIndex}
        profileImage={`activity/${profileData.sportimage}`}
        profileName={profileData.sportname}
        onPress={onPress}
        tabArray={tabArray}
        analyticsProperties={analytics}
        navigation={navigation}
      />
    </View>
  )
}

SportsProfileScreen.propTypes = {
  profileData: PropTypes.object.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  analytics: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default withProfileCanvas()(SportsProfileScreen)
