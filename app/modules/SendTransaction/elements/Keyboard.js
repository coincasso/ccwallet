import React, { Component } from 'react'
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native'
import debounce from 'lodash.debounce'
import HapticHandler from '../../../Handler/HapticHandler'
import images from '../../../commons/images'
import MainStore from '../../../AppStores/MainStore'
import KeyBoardButton from './KeyboardButton'

const { height } = Dimensions.get('window')
const isSmallScreen = height < 650

const dataNumber1 = [
  { number: '1' },
  { number: '2' },
  { number: '3' }
]
const dataNumber2 = [
  { number: '4' },
  { number: '5' },
  { number: '6' }
]
const dataNumber3 = [
  { number: '7' },
  { number: '8' },
  { number: '9' }
]
const dataNumber4 = [
  {
    number: '.'
  },
  { number: '0' },
  {
    icon: images.imgDeletePin,
    actions: 'delete'
  }
]

export default class KeyBoard extends Component {
  constructor(props) {
    super(props)
    this.amountStore = MainStore.sendTransaction.amountStore
  }

  _onMaxPress = () => {
    if(!MainStore.erc20)
      this.amountStore.max()
    else
    {
      MainStore.erc20TransferAmountString = (MainStore.selectedErcToken.balance / Math.pow(10, parseInt(MainStore.selectedErcToken.tokenInfo.decimals))).toString();
      MainStore.erc20TransferAmount = parseFloat(MainStore.erc20TransferAmountString);
    }

  }
  _onKeyPress = debounce((text) => {
    HapticHandler.ImpactLight()
    if(!MainStore.erc20)
      this.amountStore.add({ text })
    else
    {
      MainStore.erc20TransferAmoutString += text;
      if(!isNaN(MainStore.erc20TransferAmountString))
        MainStore.erc20TransferAmount = parseFloat(MainStore.erc20TransferAmoutString);
    }

  }, 0)

  _onBackPress = debounce(() => {
    if(!MainStore.erc20)
      this.amountStore.remove()
    else
    {
      if(MainStore.erc20TransferAmountString.length === 1)
        MainStore.erc20TransferAmountString = '0';
      else
        MainStore.erc20TransferAmount = MainStore.erc20TransferAmountString.slice(0, -1);

        if(!isNaN(MainStore.erc20TransferAmountString))
          MainStore.erc20TransferAmount = parseFloat(MainStore.erc20TransferAmoutString);
    }

  }, 0)

  _onLongPress = debounce(() => {
    if(!MainStore.erc20)
      this.amountStore.clearAll()
    else
    {
      MainStore.erc20TransferAmountString = '0';
      MainStore.erc20TransferAmount = 0;
    }
  }, 0)

  renderNumber(arrayNumber) {
    const nums = arrayNumber.map((num, i) => {
      if (num.number) {
        return (
          <KeyBoardButton
            key={`${num.number}`}
            style={styles.numberField}
            content={num.number}
            contentStyle={styles.numberText}
            onPress={() => this._onKeyPress(num.number)}
          />
        )
      }
      return (
        <TouchableOpacity
          key={num.actions}
          onLongPress={() => {
            this._onLongPress()
          }}
          onPress={() => {
            HapticHandler.ImpactLight()
            if (num.actions === 'delete') {
              this._onBackPress()
            }
          }}
        >
          <Animated.View style={styles.numberField} >
            <Image
              source={num.icon}
            />
          </Animated.View >
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.arrayNumber}>
        {nums}
      </View>
    )
  }

  render() {
    return (
      <View
        style={styles.keyboard}
      >
        <TouchableOpacity
          style={styles.maxButton}
          onPress={this._onMaxPress}
        >
          <Text style={{ fontSize: 16, color: '#4A90E2', fontFamily: 'OpenSans-Semibold' }}>Max</Text>
        </TouchableOpacity>
        {this.renderNumber(dataNumber1)}
        {this.renderNumber(dataNumber2)}
        {this.renderNumber(dataNumber3)}
        {this.renderNumber(dataNumber4)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  keyboard: {
    marginLeft: 30,
    marginRight: 30
  },
  maxButton: {
    height: 40,
    paddingLeft: 32,
    paddingRight: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#0E1428',
    marginBottom: 10
  },
  numberField: {
    width: isSmallScreen ? 65 : 75,
    height: isSmallScreen ? 65 : 75,
    // borderRadius: 37.5,
    // backgroundColor: AppStyle.colorPinCode,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 13
  },
  numberText: {
    // fontFamily: 'OpenSans-Semibold',
    fontSize: 30,
    color: 'white'
  },
  arrayNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between'
    // marginTop: height * 0.01
  }
})
