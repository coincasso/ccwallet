import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import Helper from '../../../commons/Helper'
import images from '../../../commons/images'
import MainStore from '../../../AppStores/MainStore'
import AppStyle from '../../../commons/AppStyle'

export default class FlexIcon extends Component {
  static propTypes = {
    renderUrl: PropTypes.string.isRequired
  }

  render() {
      return (
        <Image
          source={{uri: this.props.renderUrl}}
          style={styles.image}
          resizeMode="contain"
        />
      )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  iconField: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: {
    color: 'white',
    fontSize: 24,
    fontFamily: AppStyle.mainFontSemiBold
  }
})
