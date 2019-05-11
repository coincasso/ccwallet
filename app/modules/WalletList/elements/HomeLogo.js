import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
      Image,
  Text
} from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react/native'
import AppStyle from '../../../commons/AppStyle'
import images from '../../../commons/images'

@observer
export default class HomeLogo extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  static defaultProps = {
    onPress: () => { }
  }

  render() {
    
    return (
      <Image
          source={images.loadingLogo}
          style={styles.image}
       
        />
   
    )
  }
}

const styles = StyleSheet.create({
  image: {
      height: 95,
      width: 100,
        marginRight: 20,
      paddingLeft: 20,
      paddingRight: 20
  },
    container: {

  },
  browserButton: {
    height: 40,
    backgroundColor: '#121734',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20
  }
})