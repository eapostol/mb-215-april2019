import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { ImageLink, FormatData } from '../helpers/helpers'

const numColumns = 2

class ImageListingComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleClick(id) {
    const { gotoScreen } = this.props
    gotoScreen(id)
  }

  renderItem = ({ item }) => {
    const { style } = this.props
    if (item.empty === true) {
      return <View style={[styles.video_box, styles.itemInvisible]} />
    }
    return (
      <TouchableHighlight
        key={item.id}
        style={styles.image_box}
        onPress={() => this.handleClick(item.id)}
      >
        <View>
          <Image style={[styles.img, style]} source={{ uri: ImageLink(item.image) }} />
          <View style={styles.imgcap}>
            <Text style={styles.title}>{item.title}</Text>
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

ImageListingComponent.propTypes = {
  gotoScreen: PropTypes.func.isRequired,
  style: PropTypes.object,
  data: PropTypes.array,
}

ImageListingComponent.defaultProps = {
  style: {},
  data: [],
}

const styles = StyleSheet.create({
  list_wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
  },
  image_box: {
    width: '49.4%',
    height: 'auto',
    marginTop: 2,
    marginRight: 2,
    backgroundColor: '#777',
    position: 'relative',
  },
  img: {
    width: '100%',
    resizeMode: 'cover',
    height: 175,
    position: 'relative',
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
  },
  imgcap: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    position: 'absolute',
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
})

export default ImageListingComponent
