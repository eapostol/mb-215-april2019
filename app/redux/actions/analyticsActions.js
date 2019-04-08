import { SET_USERID, SET_TRAITS } from './types'

export const setUserId = userId => ({ type: SET_USERID, payload: userId })

export const setTrait = trait => ({ type: SET_TRAITS, payload: trait })

export const setUserIdAction = userId => (dispatch) => {
  dispatch(setUserId(userId))
}


export const setTraitAction = traits => (dispatch) => {
  dispatch(setTrait(traits))
}
