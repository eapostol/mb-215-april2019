/* eslint-disable no-console */
import React, { Component } from 'react'
import UUID from 'pure-uuid'
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight } from 'react-native'
import { Icon } from 'react-native-elements'
import * as PropTypes from 'prop-types'
import { FormatData } from '../helpers/helpers'
import playBtn from '../assets/images/play-btn.png'
import defaultVideoThumbnail from '../assets/images/default-video.png'

const numColumns = 2

class VideoListingComponent extends Component {
  // TODO: ensure that all blank source.uris for images are handled
  itemObj = {
    activity: '',
    reference: '',
    teamId: '',
    thumbString: 'http://spacergif.org/spacer.gif',
    title: '',
    videoId: '',
    videoProfileId: '',
    videoSource: '',
    videoSourceId: '',
    videoStatus: '',
    videoSummary: '',
    videoUUID: '',

  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  renderItem = ({ item = this.itemObj }) => {
    const { setModalVisible, isEdit } = this.props
    if (item.empty === true) {
      return <View style={[styles.video_box, styles.itemInvisible]} />
    }
    return (
      <TouchableHighlight
        key={item.videoId}
        style={styles.video_box}
        onPress={() => {
          const sessionId = (new UUID(4)).format('std')
          setModalVisible(true, item.reference, {
            sessionId,
            videoPlayer: item.videoSource,
            contentId: item.videoId,
          },
          {
            sessionId,
            assetId: item.videoId,
            title: item.title,
            description: item.videoSummary,
            lpsActivity: item.activity,
            lpsProfileId: item.videoProfileId,
            lpsTeamId: item.teamId,
          })
        }}
      >
        <View>
          <Image style={styles.vidimg} source={{ uri: item.thumbString }} defaultSource={defaultVideoThumbnail} />
          <View style={styles.vidcap}>
            <Image style={styles.playicon} source={playBtn} />
            {isEdit === true && <Icon name="edit" size="15" containerStyle={{ position: 'absolute', top: -100, right: 0, backgroundColor: '#dcdcdc', borderRadius: 30, padding: 3 }} />}
            <Text style={styles.vidtext}>{item.title.substring(0, 40)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { data } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data={FormatData(data, numColumns)}
          keyExtractor={(x, i) => i}
          numColumns={numColumns}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

VideoListingComponent.propTypes = {
  data: PropTypes.array.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
}

VideoListingComponent.defaultProps = {
  isEdit: false,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 1,
  },
  video_box: {
    flex: 1,
    height: 'auto',
    backgroundColor: 'black',
    marginTop: 2,
    marginRight: 2,
  },
  vidimg: {
    width: '100%',
    resizeMode: 'cover',
    height: 120,
    position: 'relative',
  },
  closeicon: {
    resizeMode: 'cover',
  },
  vidcap: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
  },
  playicon: {
    position: 'absolute',
    left: 2,
    top: 5,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  vidtext: {
    color: '#fff',
    fontSize: 10,
    paddingLeft: 30,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
})

export default VideoListingComponent
