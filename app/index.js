import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import analytics from './helpers/analytics'
import MyApp from './config/routes'


class App extends Component {
  componentWillMount() {
    analytics.init()
  }

  render() {
    return (
      <Provider store={store}>
        <MyApp />
      </Provider>
    )
  }
}

export default App
