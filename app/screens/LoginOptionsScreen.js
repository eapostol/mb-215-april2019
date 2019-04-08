import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent'

const LoginOptionsScreen = props => (
  <View style={styles.container}>
    <HeaderComponent onPress={() => props.navigation.openDrawer()} />
    <View style={styles.body}>
      <Text style={styles.headingText}>welcome</Text>
      <Text style={styles.bodyText}>Please choose your login method.</Text>
      <Button
        title="login with email"
        buttonStyle={[styles.buttonStyle, { backgroundColor: '#4a2E8D' }]}
        fontSize={16}
        color="#fff"
        onPress={() => props.navigation.navigate('LoginWithEmail')}
      />
      <Button
        title="login with facebook"
        buttonStyle={[styles.buttonStyle, { backgroundColor: '#4968ab' }]}
        fontSize={16}
        color="#fff"
      />
      <Button
        title="login with google"
        buttonStyle={[styles.buttonStyle, { backgroundColor: '#c43c2b' }]}
        fontSize={16}
        color="#fff"
      />
      <Button
        title="login with twitter"
        buttonStyle={[styles.buttonStyle, { backgroundColor: '#26b4e9' }]}
        fontSize={16}
        color="#fff"
      />
      <Text style={styles.bodyText}>Not yet a member?</Text>
      <Text style={[styles.bodyText, { textDecorationLine: 'underline' }]}>join here</Text>
    </View>
  </View>
)

LoginOptionsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    alignItems: 'center',
  },
  headingText: {
    padding: 30,
    fontSize: 44,
    color: '#3a3a3b',
    fontWeight: '400',
    letterSpacing: -0.2,
  },
  bodyText: {
    padding: 10,
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: -0.2,
    lineHeight: 28,
  },
  buttonStyle: {
    width: 300,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 3,
    paddingRight: 3,
  },
})

export default LoginOptionsScreen
