import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import VideoListingComponent from '../components/VideoListingComponent'
import { getDataByPayload } from '../api/commonAPI'
import getRouteMetaData from './routeMetaData'
import VideoModalComponent from '../components/VideoModalComponent'
import analytics from '../helpers/analytics'
import env from '../config/env'

const withProfileCanvas = () => (WrappedComponent) => {
  class ProfileCanvasLoader extends Component {
    constructor(props) {
      super(props)
      this.state = {
        videosData: [],
        profileData: {},
        currentIndex: 0,
        isLoading: true,
        isOpen: false,
        videoPlayUrl: '',
        sendAnalytics: true,
        analyticsVideoPlaybackProperties: {},
        analyticsVideoContentProperties: {},
        isEdit: false,
      }
      this.fetchVideos = this.fetchVideos.bind(this)
      this.updateIndex = this.updateIndex.bind(this)
      this.fetchInfo = this.fetchInfo.bind(this)
      this.setModalVisible = this.setModalVisible.bind(this)
    }

    componentDidMount() {
      this.fetchVideos()
      this.fetchInfo()
    }

    setModalVisible(visible, reference, analyticsProperties, anlyticsContentProperties) {
      const { analyticsVideoPlaybackProperties, analyticsVideoContentProperties } = this.state
      if (!visible) {
        analytics.track('Video Content Completed', analyticsVideoContentProperties)
        analytics.track('Video Playback Completed', analyticsVideoPlaybackProperties)
      }
      this.setState({
        videoPlayUrl: reference,
        isOpen: visible,
        analyticsVideoPlaybackProperties: visible ? analyticsProperties : {},
        analyticsVideoContentProperties: visible ? anlyticsContentProperties : {},
        // disable screen analytics until new tab is pressed
        sendAnalytics: false,
      })
    }

    updateIndex = (newIndex) => {
      const { currentIndex } = this.state
      if (newIndex !== currentIndex) this.setState({ currentIndex: newIndex, sendAnalytics: true })
    }

    fetchInfo() {
      const { navigation } = this.props
      const RouteData = getRouteMetaData(navigation.state.routeName)
      const profileUrl = RouteData.profile.api
      const payload = RouteData.profile.payload(navigation.getParam('id', 'NO-ID'))
      const isEdit = RouteData.profile.payload(navigation.getParam('isEdit', false))
      this.setState({ isEdit: isEdit.id })
      getDataByPayload(profileUrl, payload)
        .then((profileData) => {
          this.setState({ profileData, isLoading: false })
        })
        .catch((error) => {
          if (env.isDev) console.log(error)
        })
    }


    fetchVideos() {
      const { navigation } = this.props
      const RouteData = getRouteMetaData(navigation.state.routeName)
      const videosUrl = RouteData.videos.api
      const payload = RouteData.videos.payload(navigation.getParam('id', 'NO-ID'))

      getDataByPayload(videosUrl, payload)
        .then((videosData) => {
          this.setState({ videosData })
        })
        .catch((error) => {
          if (env.isDev) console.log(error)
        })
    }

    render() {
      const { isOpen, videoPlayUrl } = this.state
      const { profileData,
        videosData,
        analyticsVideoPlaybackProperties,
        analyticsVideoContentProperties,
        currentIndex,
        isLoading,
        sendAnalytics, isEdit } = this.state
      const { navigation } = this.props

      const analyticsProperties = () => {
        const RouteData = getRouteMetaData(navigation.state.routeName)

        const properties = {
          sendAnalytics,
          properties: {
            section: RouteData.analytics,
          },
        }
        return properties
      }

      return (
        <View style={{ flex: 1 }}>
          <HeaderComponent onPress={() => {
            // disable screen analytics until new tab is pressed
            this.setState({ sendAnalytics: false })
            navigation.openDrawer()
          }}
          />
          {!isLoading && (
            <WrappedComponent
              profileData={profileData}
              videosData={videosData}
              currentIndex={currentIndex}
              onPress={this.updateIndex}
              navigation={navigation}
              isEdit={isEdit}
              analytics={analyticsProperties()}
            />
          )}
          <View style={{ flex: 2 }}>
            <VideoListingComponent data={videosData} setModalVisible={this.setModalVisible} isEdit={isEdit} />
          </View>
          <VideoModalComponent
            isOpen={isOpen}
            videoPlayUrl={videoPlayUrl}
            setModalVisible={this.setModalVisible}
            analyticsVideoPlaybackProperties={analyticsVideoPlaybackProperties}
            analyticsVideoContentProperties={analyticsVideoContentProperties}
          />
        </View>
      )
    }
  }

  ProfileCanvasLoader.propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  return ProfileCanvasLoader
}

export default withProfileCanvas
