import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import withSectionList from './withSectionList'
import HeaderComponent from '../components/HeaderComponent'
import ImageListingComponent from '../components/ImageListingComponent'

const TeamsScreen = ({ data, gotoScreen, navigation }) => (
  <View style={styles.container}>
    <HeaderComponent onPress={() => navigation.openDrawer()} />
    <ImageListingComponent data={data} gotoScreen={gotoScreen} />
  </View>
)

TeamsScreen.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  gotoScreen: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default withSectionList()(TeamsScreen)
