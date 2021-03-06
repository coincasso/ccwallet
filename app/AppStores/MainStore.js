import { observable, action } from 'mobx'
import AppDS from './DataSource/AppDS'
import appState from './AppState'
import PushNotificationHelper from '../commons/PushNotificationHelper'

// do not allow change state outside action function
// configure({ enforceActions: true })

// const pincode = `111111` // for test

class MainStore {
  @observable appState = appState
  secureStorage = null
  sendTransaction = null
  unlock = null
  importStore = null
  backupStore = null
  changePincode = null
  dapp = null
  addressBookStore = null
  importMnemonicStore = null
  importPrivateKeyStore = null
  importAddressStore = null
  @observable ccxPrice = 0
  @observable walletTokenStore = {}
  @observable walletTokenMapping = {}
  @observable erc20TransferAmount = 5
  @observable erc20TransferAmountString = '5'
  @observable tokenDataFetching = true

  checkBalanceJob = null;

  // Start
  @action async startApp() {
    await AppDS.readAppData()
    await PushNotificationHelper.init()
    appState.syncWalletAddresses()
    appState.initMixpanel()
    appState.startAllServices()
  }
}

export default new MainStore
