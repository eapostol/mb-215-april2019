import { Segment } from 'expo'
import env from '../config/env'
import store from '../redux/store'
import { setUserIdAction, setTraitAction } from '../redux/actions/analyticsActions'

export default {
  init(): void {
    const { androidWriteKey, iosWriteKey } = env.analytics

    Segment.initialize({ androidWriteKey, iosWriteKey })

    log('initialize')
  },

  identify(userId, traits) {
    if (userId) {
      store.dispatch(setUserIdAction(userId.toString()))
      store.dispatch(setTraitAction(traits))
      callIdentify()
    }
  },

  track(event = 'ERROR: MISSING EVENT NAME', properties = null) {
    if (!properties) Segment.track(event)
    else Segment.trackWithProperties(event, properties)
    log('track', event, properties)

    callIdentify()
  },

  screen(screenName = 'ERROR: MISSING SCREEN NAME', properties = null) {
    if (!properties) Segment.screen(screenName)
    else Segment.screenWithProperties(screenName, properties)
    log('screen', screenName, properties)

    callIdentify()
  },
}
const callIdentify = () => {
  const loginStates = store.getState().analyticsReducer
  if (loginStates.userId) {
    if (!loginStates.traits) Segment.identify(loginStates.userId)
    else Segment.identifyWithTraits(loginStates.userId, loginStates.traits)
    log('identify', loginStates.userId, loginStates.traits)
  }
}

const log = (type, value = 'n/a', properties = null) => {
  if (env.isDev) console.log(`analytics: \t${type} : ${value}`)
  if (properties && env.isDev) console.log(properties)
}
