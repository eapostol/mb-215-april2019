/* eslint-disable no-console,no-prototype-builtins */
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SET_EMAIL, SET_PASSWORD, SET_LOGOUT } from './types'
import { getDataByPayload } from '../../api/commonAPI'
import env from '../../config/env'
import analytics from '../../helpers/analytics'

const loginEndPoint = 'do_login.php'
const loginUrl = env.apiURLAccount + loginEndPoint

export const loginRequest = () => {
  console.log('LoginWithEmailScreen.js: loginRequest()')
  return { type: LOGIN_REQUEST }
}

export const loginSuccess = (json) => {
  console.log('LoginWithEmailScreen.js: loginSuccess() - json returned is  = ', json)
  return { type: LOGIN_SUCCESS, payload: json }
}

export const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error })

export const setEmail = email => ({ type: SET_EMAIL, payload: email })

export const setPassword = password => ({ type: SET_PASSWORD, payload: password })

export const fetchLogin = payload => (dispatch) => {
  getDataByPayload(loginUrl, payload)
    .then((loginResponse) => {
      console.log('LoginWithEmailScreen.js: fetchLogin() - loginResponse = ', loginResponse)
      if (loginResponse.hasOwnProperty('accountInfo')) {
        // eslint-disable-next-line dot-notation
        console.log('LoginWithEmailScreen.js: fetchLogin() - accountInfo exists. \n loginResponse.accountInfo =  ', loginResponse['accountInfo'])
        const traitObj = {
          createdAt: loginResponse.accountInfo.createdDate || '',
          email: loginResponse.accountInfo.email || '',
          firstName: loginResponse.namesComponent.firstname || '',
          lastName: loginResponse.namesComponent.lastname || '',
          birthday: loginResponse.namesComponent.birthdate || null,
          gender: (loginResponse.namesComponent.gender && (loginResponse.namesComponent.gender === 'M' ? 'male' :  (loginResponse.namesComponent.gender === 'F' ? 'female' : null))) || null,
          avatar: '',
          address: {
            city: loginResponse.primaryProfile.profileInfo.city || '',
            stateProvince: loginResponse.primaryProfile.profileInfo.stateProvince || '',
            country: loginResponse.primaryProfile.profileInfo.Country || '',
          },
          lpsPrimaryActivitiesCount: loginResponse.primaryProfile.hasOwnProperty('activities') ? (loginResponse.primaryProfile.activities).length : 0,
          lpsPrimaryVideosCount: loginResponse.primaryProfile.hasOwnProperty('profileVideos') ? (loginResponse.primaryProfile.profileVideos).length : 0,
          lpsPrimaryProfileStatus: loginResponse.primaryProfile.profileInfo.status || null,
        }
        analytics.identify((loginResponse.accountInfo.id).toString(), traitObj)
        if (loginResponse.primaryProfile.profileInfo.status === 'complete') dispatch(loginSuccess(loginResponse))
        else {
          console.log('LoginWithEmailScreen.js: fetchLogin() - Error: Profile is not published yet...')
          const errorMessage = {
            message: 'Please publish profile on web and try again',
            type: 'profile_unpublished',
          }
          dispatch(loginFailure(errorMessage))
        }
      } else if (loginResponse.hasOwnProperty('message')) {
        // eslint-disable-next-line dot-notation
        console.log('LoginWithEmailScreen.js: fetchLogin() - A message was received. message is -', loginResponse['message'])
        dispatch(loginFailure(loginResponse))
      } else {
        console.log('LoginWithEmailScreen.js: fetchLogin() - This else statement should not be seen.')
      }
    })
    .catch((error) => {
      dispatch(loginFailure(error))
    })
}

export const setEmailAction = email => (dispatch) => {
  dispatch(setEmail(email))
}

export const setPasswordAction = password => (dispatch) => {
  dispatch(setPassword(password))
}

export const logoutRequest = () => ({ type: SET_LOGOUT })
