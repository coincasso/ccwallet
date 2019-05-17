import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import { observer } from 'mobx-react/native'
import NavigationHeader from '../../../components/elements/NavigationHeader'
import SmallCard from '../../../components/elements/SmallCard'
import LayoutUtils from '../../../commons/LayoutUtils'
import constant from '../../../commons/constant'
import images from '../../../commons/images'
import AppStyle from '../../../commons/AppStyle'
import NavStore from '../../../AppStores/NavStore'
import { chainNames } from '../../../Utils/WalletAddresses'

const marginTop = LayoutUtils.getExtraTop()
const { width } = Dimensions.get('window')

@observer
export default class CreateWalletScreen extends Component {
  goBack = () => {
    NavStore.goBack()
  }

  gotoEnterName = () => {
    NavStore.pushToScreen('WalletTypeCreateScreen')
  }

  gotoImport = () => {
    NavStore.pushToScreen('WalletTypeImportScreen')
  }
  gotoCCX = () => {
  
    NavStore.pushToScreen('EnterNameScreen', {
      coin: chainNames.ETH
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationHeader
          style={{ marginTop: marginTop + 20 }}
          headerItem={{
            title: constant.CREATE_NEW_WALLET,
            icon: null,
            button: images.closeButton
          }}
          action={this.goBack}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SmallCard
            style={{width: width-40, borderRadius: 0, backgroundColor:AppStyle.backgroundDarkMode}}
            title="Create"
            subtitle="a new wallet"
            imageCard={images.imgCardCreate}
            onPress={this.gotoEnterName}
            imgBackgroundStyle={{ height: 214, borderRadius: 0, width: width - 40 }}
            titleTextStyle={{ color: AppStyle.mainColor }}
            subtitleTextStyle={{ color: AppStyle.secondaryTextColor, marginTop: 4, fontSize: 16 }}
          />
        

          <SmallCard
            style={{ marginTop: 20, height:100, width: width-40, borderRadius: 0, backgroundColor:AppStyle.backgroundDarkMode}}
            title="Import"
            subtitle="existing wallet"
            imageCard={images.iconShare}
            onPress={this.gotoImport}
            imgBackground="backgroundCard"
            imgBackgroundStyle={{ height: 214, borderRadius: 0, width: width - 40, marginLeftOfItem:100 }}
            titleTextStyle={{ color: AppStyle.mainTextColor }}
            subtitleTextStyle={{ color: AppStyle.secondaryTextColor, marginTop: 4, fontSize: 16 }}
          />
        
            <SmallCard
            style={{ marginTop: 20, height:100, width: width-40, borderRadius: 20, backgroundColor:AppStyle.backgroundColor,  borderWidth: 1, borderColor:AppStyle.mainColor }}
            title="Get free CCX"
            subtitle="Only 5000 CCX to win"
            imageCard={images.icon_addBold}
            onPress={this.gotoCCX}
            imgBackground="backgroundCard"
            imgBackgroundStyle={{ height: 214, borderRadius: 14, width: width - 40 }}
            titleTextStyle={{ color: AppStyle.mainTextColor }}
            subtitleTextStyle={{ color: AppStyle.secondaryTextColor, marginTop: 4, fontSize: 16 }}
          />
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
