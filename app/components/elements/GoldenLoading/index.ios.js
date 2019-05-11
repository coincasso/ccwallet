import React, { Component } from 'react'
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions
} from 'react-native'
import RNGoldenLoading from '../../../../Libs/rn-golden-loading'
import images from '../../../commons/images'

const circleSize = 160


export default class GoldenLoading extends Component {

  stop() {
  }

 

  render() {
    return (
   
        <View style={styles.styleCircle}>
        <Image
          source={images.loadingLogo}
          style={styles.contactImageStyle}
        />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  styleCircle: {
    width: circleSize,
    height: circleSize
  },
  contactImageStyle: {
    width: circleSize,
    height: circleSize
  }
})

