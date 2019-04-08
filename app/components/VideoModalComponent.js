import React from 'react'
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, WebView, Dimensions, TouchableHighlight, StyleSheet, StatusBar } from 'react-native'
import Modal from 'react-native-modalbox'
import PropTypes from 'prop-types'
import close from '../assets/images/close.png'
import analytics from '../helpers/analytics'


const VideoModalComponent = (props) => {
  StatusBar.setHidden(false)
  const { isOpen,
    videoPlayUrl,
    setModalVisible,
    analyticsVideoPlaybackProperties,
    analyticsVideoContentProperties } = props
  const { width } = Dimensions.get('window')
  if (isOpen) analytics.track('Video Playback Started', analyticsVideoPlaybackProperties)
  return (
    <Modal
      animationType="fade"
      transparent
      presentationStyle="overFullScreen"
      isOpen={isOpen}
      style={{ backgroundColor: 'rgba(0,0,0,0.0)', top: 35 }}
      backdropOpacity={0.3}
      onRequestClose={() => setModalVisible(false, '')}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => setModalVisible(false, '')}
      >
        <View>
          <View style={{ width, height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', top: 0, paddingTop: 20 }}>
            <TouchableWithoutFeedback
              onPress={() => analytics.track('Video Content Started', analyticsVideoContentProperties)}
            >
              <View style={{ width, height: 260, marginTop: 35 }}>
                {<WebView
                  source={{ html: `<style>.resp-container {
position: relative; overflow: hidden; padding-top: 56.25% }</style><style>.resp-iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }</style><div class="resp-container"><iframe class="resp-iframe" src="${videoPlayUrl}?autoplay=1" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen ></iframe></div>` }}
                  javaScriptEnabled
                  domStorageEnabled
                  resizeMode="cover"
                  scrollEnabled={false}
                  style={{ backgroundColor: 'transparent', height: 150, top: 35 }}
                  useWebKit
                />}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TouchableHighlight
            style={{ position: 'absolute', top: 25, right: 7, zIndex: 20 }}
            onPress={() => setModalVisible(false, '')}
          >
            <Image style={styles.closeicon} source={close} />
          </TouchableHighlight>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

VideoModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  videoPlayUrl: PropTypes.string.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  analyticsVideoPlaybackProperties: PropTypes.object.isRequired,
  analyticsVideoContentProperties: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  closeicon: {
    resizeMode: 'cover',
  },
})

export default VideoModalComponent
