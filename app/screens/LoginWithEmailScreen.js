/* eslint-disable no-console */
import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { View, StyleSheet, Text, Platform, ActivityIndicator, Linking } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import * as t from 'tcomb-form-native'
import HeaderComponent from '../components/HeaderComponent'
import { fetchLogin } from '../redux/actions/loginActions'


// const INPUT_COLOR = '#000000'
const ERROR_COLOR = '#a94442'
const BORDER_COLOR = '#cccccc'
const DISABLED_COLOR = '#777777'
const DISABLED_BACKGROUND_COLOR = '#eeeeee'
// const FONT_SIZE = 17

const { Form } = t.form

const Email = t.refinement(t.String, (email) => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return reg.test(email)
})

const Login = t.struct({
  username: Email,
  password: t.String,
})

const style = {
  ...Form.stylesheet,
  textbox: {
    normal: {
      height: 36,
      paddingVertical: Platform.OS === 'ios' ? 7 : 0,
      paddingHorizontal: 7,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      width: 320,
      fontSize: 16,
      borderRadius: 10,
      backgroundColor: '#ececed',
      color: '#3a3a3b',
      padding: 10,
      margin: 10,
    },
    error: {
      height: 36,
      paddingVertical: Platform.OS === 'ios' ? 7 : 0,
      paddingHorizontal: 7,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      width: 320,
      fontSize: 16,
      borderRadius: 10,
      backgroundColor: '#ececed',
      color: '#3a3a3b',
      padding: 10,
      margin: 10,
    },
    notEditable: {
      height: 36,
      paddingVertical: Platform.OS === 'ios' ? 7 : 0,
      paddingHorizontal: 7,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR,
      width: 320,
      fontSize: 16,
      borderRadius: 10,
      padding: 10,
      margin: 10,
    },
  },
}

const options = {
  auto: 'placeholders',
  stylesheet: style,
  fields: {
    username: {
      placeholder: 'lpstestcomplete@lps.com',
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      defaultValue: 'lpstestcomplete@lps.com',
    },
    password: {
      password: true,
      secureTextEntry: true,
      placeholder: 'password',
    },
  },
}

const defaultFormValue = {
  username: 'lpstestcomplete@lps.com',
  password: 'asdf',
}

class LoginWithEmailScreen extends Component {
  componentDidUpdate(prevProps) {
    const { loginResponse: prevLoginResponse } = prevProps
    const { loginResponse, navigation } = this.props
    if (prevLoginResponse.loginReducer.isLoggedIn
      !== loginResponse.loginReducer.isLoggedIn
      && loginResponse.loginReducer.isLoggedIn
    ) {
      navigation.navigate('Home')
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {

  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    // this does not seem to get fired
    console.log('LoginWithEmailScreen.js: componentWillReceiveProps() - nextProps = ', nextProps)
    console.log('LoginWithEmailScreen.js: componentWillReceiveProps() - nextContext = ', nextContext)
  }

  handleSubmit() {
    const { fetchLogin: doLogin } = this.props
    console.log('LoginWithEmailScreen.js: handleSubmit() - doLogin = ', doLogin)
    const value = this.form.getValue()
    // value is the username, password credentials as a struct
    console.log('LoginWithEmailScreen.js: handleSubmit() - value = ', value)

    if (value) {
      doLogin({ email: value.username, password: value.password })
    }
  }

  render() {
    const { loginResponse, navigation } = this.props

    return (
      <View style={styles.container}>
        <HeaderComponent onPress={() => navigation.openDrawer()} />
        {loginResponse.loginReducer.isFetching && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <View style={styles.body}>
          <Text style={styles.headingText}>Welcome</Text>
          <Text style={styles.bodyText}>Please login with your email.</Text>

          {/* eslint-disable-next-line max-len */}
          {loginResponse.loginReducer.errorMessage ? <Text>{loginResponse.loginReducer.errorMessage.message}</Text> : null}
          {(loginResponse.loginReducer.errorMessage && loginResponse.loginReducer.errorMessage.type === 'profile_unpublished') ? <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('http://stage.seasonseatnetwork.com/')}>web login</Text> : null}
          <Form
            ref={(f) => { this.form = f }}
            type={Login}
            options={options}
            value={defaultFormValue}
          />
          <Text style={[styles.bodyText, { textDecorationLine: 'underline' }]} onPress={() => Linking.openURL('http://stage.seasonseatnetwork.com/')}>forgot my password</Text>
          <Button
            title="login"
            buttonStyle={[styles.buttonStyle, { backgroundColor: '#4a2E8D' }]}
            fontSize={16}
            color="#fff"
            onPress={() => this.handleSubmit()}
          />
        </View>
      </View>
    )
  }
}

LoginWithEmailScreen.propTypes = {
  fetchLogin: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  loginResponse: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  console.log('LoginWithEmailScreen.js: mapStateToProps() - state = ', state)
  return { loginResponse: state }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default connect(mapStateToProps, { fetchLogin })(LoginWithEmailScreen)
