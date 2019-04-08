import React from 'react'
import { Image, StyleSheet, View, Platform, Share } from 'react-native'
import { ButtonGroup, Text, Icon, Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import ProfileCanvasContent from './ProfileCanvasContent'
import analytics from '../helpers/analytics'
import { ImageLink } from '../helpers/helpers'
import env from '../config/env'

const ProfileCanvas = (props) => {
  const {
    currentIndex,
    onPress,
    profileImage,
    profileName,
    tabArray,
    analyticsProperties,
    navigation,
    isEdit,
  } = props

  const thisTab = tabArray[currentIndex]

  const tabAnalytics = (p, tab) => {
    const { sendAnalytics, properties } = p

    // add the tab as an additional property
    properties.subsection = tab.label.toLowerCase()
    if (sendAnalytics) analytics.screen('profile', properties)
  }

  tabAnalytics(analyticsProperties, thisTab)

  return (
    <View style={{ flex: 1, backgroundColor: '#374755', padding: 10 }}>
      <ButtonGroupRow
        buttons={tabArray.map(tab => tab.label.toLowerCase())}
        selectedIndex={currentIndex}
        onPress={onPress}
      />
      <View style={{ flexDirection: 'row', backgroundColor: '#dcdcdc', height: '95.5%', marginTop: 25 }}>
        <ProfileImage profileImage={profileImage} isEdit={isEdit} />
        <View style={styles.content_box}>
          <ProfileName profileName={profileName} isEdit={isEdit} />
          <View styles={styles.leaguesList}>
            <ProfileCanvasContent type={thisTab.type} data={thisTab.data} navigation={navigation} />
          </View>
        </View>
      </View>
    </View>

  )
}

ProfileCanvas.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  profileImage: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  tabArray: PropTypes.array.isRequired,
  analyticsProperties: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  isEdit: PropTypes.bool,
}

const ButtonGroupRow = (props) => {
  const { buttons, onPress, selectedIndex } = props

  const width = buttons.length * 100

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
      <ButtonGroup
        onPress={onPress}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ width, borderWidth: 0, borderRadius: 0, height: 30 }}
        textStyle={{ fontSize: 15 }}
        containerBorderRadius={0}
        buttonStyle={{ borderBottomWidth: 1, borderBottomColor: 'grey' }}
        innerBorderStyle={{ color: 'grey' }}
        selectedButtonStyle={{ borderWidth: 0, borderBottomWidth: 0, backgroundColor: '#dcdcdc' }}
      />
    </View>
  )
}

ButtonGroupRow.propTypes = {
  buttons: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
}

const ProfileName = (props) => {
  const { profileName, isEdit } = props
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 20, paddingBottom: 0 }}>
        {profileName}
      </Text>
      {isEdit == true && <Icon name="edit" size="15" />}
    </View>
  )
}

ProfileName.propTypes = {
  profileName: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
}

const ProfileImage = (props) => {
  const { profileImage, isEdit } = props

  return (
    <View style={styles.image_box}>
      <Image source={{ uri: ImageLink(profileImage) }} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
      {isEdit == true && <Icon name="edit" size="15" containerStyle={{ position: 'absolute', top: -2, right: 0, backgroundColor: '#dcdcdc', borderRadius: 30, padding: 3 }} />}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button
          onPress={() => Share.share({
            message: 'Shared from Levelplay',
            url: env.url,
            title: 'LevelPlay',
          })}
          title="share"
          buttonStyle={{
            backgroundColor: '#ecedf0',
            height: 25,
            width: 60,
            borderColor: '#5A89B5',
            borderWidth: 1,
            borderRadius: 3,
            marginBottom: 7,
            padding: 0,
          }}
          textStyle={{
            fontSize: 15,
            color: '#5A89B5',
          }}
          containerStyle={{
            margin: 0,
            padding: 0,
          }}
        />
        {isEdit == true && <Button
          onPress={() => console.log("Add Video Clicked")}
          title="Add Video"
          buttonStyle={{
            backgroundColor: '#58318c',
            height: 25,
            width: 90,
            borderColor: '#58318c',
            borderWidth: 1,
            borderRadius: 3,
            marginBottom: 7,
            padding: 0,
          }}
          textStyle={{
            fontSize: 15,
            color: '#fff',
          }}
          containerStyle={{
            margin: 0,
            padding: 0,
          }}
        /> }
      </View>
    </View>
  )
}
ProfileImage.propTypes = {
  profileImage: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  image_box: {
    width: '35%',
    ...Platform.select({
      android: {
        height: 112,
      },
      ios: {
        height: 160,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 10,
  },
  content_box: {
    flex: 1,
    padding: 10,
  },
  leaguesList: {
    marginTop: 0,
  },
})

export default ProfileCanvas
