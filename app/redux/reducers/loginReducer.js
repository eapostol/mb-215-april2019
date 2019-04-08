/* eslint-disable no-console */
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SET_EMAIL, SET_PASSWORD, SET_LOGOUT } from '../actions/types'

const initialState = {
  isFetching: false,
  errorMessage: null,
  loginResponse: {},
  userName: '',
  password: '',
  isLoggedIn: false,
}

const loginReducer = (state = initialState, action) => {
  console.log('loginReducer.js: loginReducer() - action.type = ', action.type)

  switch (action.type) {
    case LOGIN_REQUEST:
      console.log('reducer: LOGIN_REQUEST')
      return {
        ...state,
        isFetching: true,
      }
    case LOGIN_SUCCESS:
      console.log('reducer: LOGIN_SUCCESS')
      console.log('payload = ', action.payload)
      console.log('***** ORIGINAL STATE OBJECT IS  ******', state)
      console.log('*******************')
      console.log(' --- NEW STATE OBJECT IS  --- ', {
        ...state,
        isFetching: false,
        loginResponse: action.payload,
        isLoggedIn: true,
      })
      return {
        ...state,
        isFetching: false,
        loginResponse: action.payload,
        isLoggedIn: true,
      }
    case LOGIN_FAILURE:
      console.log('reducer: LOGIN_FAILURE')
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case SET_EMAIL:
      console.log('reducer: SET_EMAIL')
      return {
        ...state,
        userName: action.payload,
      }
    case SET_PASSWORD:
      console.log('reducer: SET_PASSWORD')
      return {
        ...state,
        password: action.payload,
      }
    case SET_LOGOUT:
      console.log('reducer: SET_LOGOUT')
      return {
        ...state,
        loginResponse: [],
        isLoggedIn: false,
        userName: '',
        password: '',
      }
    default:
      console.log('reducer: DEFAULT')
      return state
  }
}

export default loginReducer
