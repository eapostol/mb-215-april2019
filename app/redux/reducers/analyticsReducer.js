import { SET_USERID, SET_TRAITS } from '../actions/types'

const initialState = {
  userId: '',
  traits: {},
}

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERID:
      return {
        ...state,
        userId: action.payload,
      }
    case SET_TRAITS:
      return {
        ...state,
        traits: action.payload,
      }
    default:
      return state
  }
}

export default analyticsReducer
