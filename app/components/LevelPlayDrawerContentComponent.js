import React from 'react'
import { StyleSheet, Image, Text, View, Platform, StatusBar, TouchableOpacity } from 'react-native'
import { DrawerItems } from 'react-navigation'

import { connect } from 'react-redux'
import mobileNaveImg from '../assets/images/mobile-nav.png'

const LevelPlayDrawerContentComponent = (props) => {
  const { loginResponse } = props
  const showName = (userDetails) => {
    let name = ''
    if (userDetails.loginResponse.namesComponent.firstname) {
      name = userDetails.loginResponse.namesComponent.firstname
      if (userDetails.loginResponse.namesComponent.lastname) {
        name += ` ${userDetails.loginResponse.namesComponent.lastname}`
      }
    } else {
      name = userDetails.loginResponse.accountInfo.email
    }
    if (name.length > 18) {
      return `${name.substring(0, 17)}...`
    }
    return name
  }

  return (
    <View style={styles.container}>
      <View style={{ height: 64, backgroundColor: '#4e4b4c', borderBottomWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('Home')}>
          <Image
            source={mobileNaveImg}
            style={styles.logoImage}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ height: 50 }} />
        {(loginResponse.loginReducer.isLoggedIn) && <Text style={{ textAlign: 'center', color: '#c9c9cb', fontWeight: '600' }}>{showName(loginResponse.loginReducer)}</Text>}
        <DrawerItems
          {...props}
          activeTintColor="#5A89B5"
          activeBackgroundColor="transparent"
          inactiveTintColor="#c9c9cb"
          inactiveBackgroundColor="transparent"
          style={{ backgroundColor: '#4e4b4c' }}
          labelStyle={{ paddingLeft: 35 }}
          getLabel={(scene) => {
            if (props.loginResponse.loginReducer.isLoggedIn) {
              if (props.getLabel(scene) !== 'Login') {
                return (
                  <View style={styles.menuItem}>
                    <Text style={styles.menuText}>{props.getLabel(scene)}</Text>
                  </View>
                )
              }
            } else {
              if (props.getLabel(scene) !== 'Logout' && props.getLabel(scene) !== 'Edit Profile') {
                return (
                  <View style={styles.menuItem}>
                    <Text style={styles.menuText}>{props.getLabel(scene)}</Text>
                  </View>
                )
              }
            }
          }}
        />
      </View>
    </View>
  )
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4e4b4c',
  },
  logoImage: {
    marginTop: 15,
    ...Platform.select({
      width: '100%',
      android: {
        marginTop: StatusBar.currentHeight + 25,
      },
    }),
  },
  menuItem: {
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  menuText: {
    paddingLeft: 35,
    color: '#c9c9cb',
    fontWeight: '700',
  },
})

const mapStateToProps = state => ({ loginResponse: state })

export default connect(mapStateToProps)(LevelPlayDrawerContentComponent)
