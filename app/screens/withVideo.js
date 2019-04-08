import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getData } from '../api/commonAPI'
import getRouteMetaData from './routeMetaData'
import analytics from '../helpers/analytics'
import env from '../config/env'

const withVideo = () => (WrappedComponent) => {
  class VideoLoader extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data: [],
      }
      this.fetchVideos = this.fetchVideos.bind(this)
    }

    componentDidMount() {
      const { navigation } = this.props
      const RouteData = getRouteMetaData(navigation.state.routeName)

      analytics.screen(RouteData.analytics)
      this.fetchVideos()
    }

    fetchVideos() {
      const { navigation } = this.props
      const RouteData = getRouteMetaData(navigation.state.routeName)
      const url = RouteData.api

      getData(url)
        .then(responseData => this.setState({ data: responseData }))
        .catch((error) => {
          if (env.isDev) console.log(error)
        })
    }

    render() {
      const { data } = this.state

      return (
        <WrappedComponent
          {...this.props}
          data={data}
        />
      )
    }
  }

  VideoLoader.propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  return VideoLoader
}

export default withVideo
