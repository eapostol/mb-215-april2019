import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import VideoListingComponent from '../components/VideoListingComponent'
import withVideo from './withVideo'
import VideoModalComponent from '../components/VideoModalComponent'
import analytics from '../helpers/analytics'

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      videoPlayUrl: '',
      analyticsVideoPlaybackProperties: {},
      analyticsVideoContentProperties: {},
    }
    this.setModalVisible = this.setModalVisible.bind(this)
  }

  setModalVisible(visible, reference, analyticsPlaybackProperties, anlyticsContentProperties) {
    const { analyticsVideoPlaybackProperties, analyticsVideoContentProperties } = this.state
    if (!visible) {
      analytics.track('Video Content Completed', analyticsVideoContentProperties)
      analytics.track('Video Playback Completed', analyticsVideoPlaybackProperties)
    }

    this.setState({
      videoPlayUrl: reference,
      isOpen: visible,
      analyticsVideoPlaybackProperties: visible ? analyticsPlaybackProperties : {},
      analyticsVideoContentProperties: visible ? anlyticsContentProperties : {},
    })
  }

  render() {
    const { isOpen,
      videoPlayUrl,
      analyticsVideoPlaybackProperties,
      analyticsVideoContentProperties } = this.state
    const { data, navigation } = this.props
    const isEdit = false

    return (
      <View style={styles.container}>
        <HeaderComponent onPress={() => navigation.openDrawer()} />
        <VideoListingComponent data={data} setModalVisible={this.setModalVisible} isEdit={isEdit} />
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

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default withVideo()(HomeScreen)
