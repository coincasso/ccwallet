import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import PropsTypes from 'prop-types'
import { observer } from 'mobx-react/native'
import AppStyle from '../../../commons/AppStyle'
import Helper from '../../../commons/Helper'
import FadeText from './FadeText'
import MainStore from '../../../AppStores/MainStore'
import NavStore from '../../../AppStores/NavStore'
import ImageIcon from './ImageIcon'
import FlexIcon from './FlexIcon'
import Router from '../../../AppStores/Router'

@observer
export default class TokenItem extends Component {
  static propTypes = {
    indexToken: PropsTypes.number.isRequired,
    style: PropsTypes.object,
    styleUp: PropsTypes.object,
    onPress: PropsTypes.func
  }

  static defaultProps = {
    style: null,
    styleUp: null,
    onPress: () => { }
  }

  get token() {
    const { indexToken } = this.props
    return this.wallet.tokens[indexToken]
  }

  get wallet() {
    return MainStore.appState.selectedWallet
  }

  createTokenTransaction(token) {
    Router.SendTransaction.goToSendTx({erc20: token, erc20Source: this.wallet.address})
  }

  render() {
    const {
      style,
      styleUp,
      onPress,
      indexToken
    } = this.props

    const {
      title, symbol, balanceToken, balanceInDollar
    } = this.token

    const { isHideValue } = this.wallet

    if(this.wallet.type === 'ethereum') {

      var tokens = [];

      if(typeof MainStore.walletTokenStore[this.wallet.address] !== 'undefined')
      {
        for(let i = 0; i < MainStore.walletTokenStore[this.wallet.address].length; i++){
          let imgUrl = MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.image;
          if(typeof imgUrl === 'undefined')
            imgUrl = 'https://coincasso.io/Themes/coincasso/assets/images/coin.png';

          let price = 'N/A';

          if(MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.address === '0x395dc9a82e3eef962b0355a3d4e6819e9af776d2') // ccx
          {
            price = '$' + (MainStore.ccxPrice * MainStore.walletTokenStore[this.wallet.address][i].balance / Math.pow(10, parseInt(MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.decimals))).toFixed(2); 
            imgUrl = 'https://coincasso.io/Images/apple-touch-icon.png';
          }
          else if(MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.price)
          {
            price = '$' + (MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.price.rate * MainStore.walletTokenStore[this.wallet.address][i].balance / Math.pow(10, parseInt(MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.decimals))).toFixed(2);
          }

          let token = MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.address;

          tokens.push(
            <TouchableOpacity key={MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.symbol} onPress={() => { this.createTokenTransaction(token); }}>
              <View style={[styles.container, style]}>
                <View style={[styles.viewUp, styleUp]}>
                  <FlexIcon renderUrl={imgUrl} />
                  <View style={[styles.viewTitle]}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.title}
                    >
                      {MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.symbol}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[styles.subTitle]}
                    >
                      {MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.name}
                    </Text>
                  </View>
                  <View style={styles.viewEther}>
                    <FadeText
                      text={`${(MainStore.walletTokenStore[this.wallet.address][i].balance / Math.pow(10, parseInt(MainStore.walletTokenStore[this.wallet.address][i].tokenInfo.decimals))).toString()}`}
                      isShow={isHideValue}
                      textStyle={[
                        styles.numberEther
                      ]}
                      style={{ right: 0, alignItems: 'flex-end' }}
                    />
                    <FadeText
                      text={`${price}`}
                      isShow={isHideValue}
                      textStyle={[
                        styles.dollaEther
                      ]}
                      style={{ right: 0, alignItems: 'flex-end' }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }
      }


      return (
      <View>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, style]}>
          <View style={[styles.viewUp, styleUp]}>
            <ImageIcon indexToken={indexToken} />
            <View style={[styles.viewTitle]}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.title}
              >
                {symbol}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.subTitle]}
              >
                {title}
              </Text>
            </View>
            <View style={styles.viewEther}>
              <FadeText
                text={`${Helper.formatETH(balanceToken)}`}
                isShow={isHideValue}
                textStyle={[
                  styles.numberEther
                ]}
                style={{ right: 0, alignItems: 'flex-end' }}
              />
              <FadeText
                text={`$${Helper.formatUSD(balanceInDollar.toString(10))}`}
                isShow={isHideValue}
                textStyle={[
                  styles.dollaEther
                ]}
                style={{ right: 0, alignItems: 'flex-end' }}
              />
            </View>
          </View>
        </View>
        </TouchableOpacity>
        {tokens}
      </View>

    ) } else { return (
      <View style={[styles.container, style]}>
              <View style={[styles.viewUp, styleUp]}>
                <ImageIcon indexToken={indexToken} />
                <View style={[styles.viewTitle]}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.title}
                  >
                    {symbol}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[styles.subTitle]}
                  >
                    {title}
                  </Text>
                </View>
                <View style={styles.viewEther}>
                  <FadeText
                    text={`${Helper.formatETH(balanceToken)}`}
                    isShow={isHideValue}
                    textStyle={[
                      styles.numberEther
                    ]}
                    style={{ right: 0, alignItems: 'flex-end' }}
                  />
                  <FadeText
                    text={`$${Helper.formatUSD(balanceInDollar.toString(10))}`}
                    isShow={isHideValue}
                    textStyle={[
                      styles.dollaEther
                    ]}
                    style={{ right: 0, alignItems: 'flex-end' }}
                  />
                </View>
              </View>
            </View>) }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginHorizontal: 15,
    flex: 1
  },
  viewUp: {
    flexDirection: 'row',
    height: 50,
    flex: 1,
    alignItems: 'center'
  },
  viewTitle: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  viewEther: {
    marginLeft: 8,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  title: {
    fontFamily: AppStyle.mainFontSemiBold,
    fontSize: 16,
    color: AppStyle.mainTextColor
  },
  subTitle: {
    marginTop: 3.5,
    fontFamily: Platform.OS === 'ios' ? 'OpenSans' : 'OpenSans-Regular',
    fontSize: 14,
    color: AppStyle.secondaryTextColor
  },
  numberEther: {
    fontSize: 18,
    color: AppStyle.mainColor,
    fontFamily: AppStyle.mainFontSemiBold
  },
  dollaEther: {
    fontSize: 14,
    marginTop: 4,
    color: AppStyle.mainTextColor,
    fontFamily: AppStyle.mainFontSemiBold
  }
})
