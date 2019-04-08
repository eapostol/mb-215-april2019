import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import analyticsReducer from './reducers/analyticsReducer'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const reducers = combineReducers({
  loginReducer,
  analyticsReducer,
})
const store = createStoreWithMiddleware(reducers)

export default store
