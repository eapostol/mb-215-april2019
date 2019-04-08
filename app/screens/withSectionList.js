import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getData } from '../api/commonAPI'
import analytics from '../helpers/analytics'
import getRouteMetaData from './routeMetaData'
import env from '../config/env'

const withSectionList = () => (WrappedComponent) => {
  class SectionListLoader extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data: [],
      }
      this.fetchData = this.fetchData.bind(this)
      this.screenAnalytics = this.screenAnalytics.bind(this)
      this.gotoScreen = this.gotoScreen.bind(this)
    }

    componentDidMount() {
      this.screenAnalytics()
      this.fetchData()
    }

    screenAnalytics = () => {
      const { navigation } = this.props
      const RouteData = getRouteMetaData(navigation.state.routeName)

      const properties = { section: RouteData.analytics }
      analytics.screen('section-index', properties)
    }

    fetchData() {
      const { navigation } = this.props
      const RouteData = getRouteMetaData(navigation.state.routeName)
      const url = RouteData.api
      getData(url)
        .then((data) => {
          const formatedData = []
          data.forEach((item) => {
            formatedData.push(RouteData.formatData(item))
          })
          this.setState({ data: formatedData })
        })
        .catch((error) => {
          if (env.isDev) console.log(error)
        })
    }

    gotoScreen(id) {
      const { navigation } = this.props
      const RouteData = getRouteMetaData(navigation.state.routeName)

      navigation.navigate(RouteData.navigate.route, { id })
    }

    render() {
      const { data } = this.state
      const { navigation } = this.props

      return (
        <WrappedComponent
          data={data}
          gotoScreen={this.gotoScreen}
          navigation={navigation}
        />
      )
    }
  }

  SectionListLoader.propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  return SectionListLoader
}

export default withSectionList
