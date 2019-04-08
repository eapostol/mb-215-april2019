import React from 'react'
import { StyleSheet, Platform, Image, StatusBar } from 'react-native'
import { Header } from 'react-native-elements'
import PropTypes from 'prop-types'
import lplogofull from '../assets/images/lplogofull.png'

const HeaderComponent = (props) => {
  const { onPress } = props
  return (
    <Header
      leftComponent={<Image source={lplogofull} style={{ width: 200, height: 35, marginTop: 10, resizeMode: 'contain' }} />}
      rightComponent={{ icon: 'menu', color: '#000', size: 25, onPress }}
      backgroundColor="#ecedf0"
      innerContainerStyles={{
        marginTop: 20,
      }}
      outerContainerStyles={{
        shadowColor: '#bfbfa6',
        shadowOpacity: 1.0,
        shadowOffset: { width: 4, height: 2 },
        ...Platform.select({
          android: {
            marginTop: StatusBar.currentHeight,
          },
        }),
      }}
    />
    /* <Header style={styles.headerStyle}>
      <Body>
        <Image source={lplogofull} style={{ width: 200, height: 35, resizeMode: 'contain' }} />
      </Body>
      <Right>
        <Icon name="ios-menu" onPress={onPress} />
      </Right>
    </Header> */
  )
}

HeaderComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#ecedf0',
    shadowColor: '#bfbfa6',
    shadowOpacity: 1.0,
    shadowOffset: { width: 4, height: 2 },
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
})

export default HeaderComponent
