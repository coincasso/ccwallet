import {getCCXTokenInfo, getCCXSaleInfo, getERC20List} from '../../api/Token';
import MainStore from '../MainStore'

export default class CheckBalanceJob {
  appState = null
  jobId = null
  timeInterval = 20000
  ignoreSelectedWallet = false

  constructor(appState, timeInterval = 20000) {
    this.appState = appState
    this.timeInterval = timeInterval
  }

  fetchWalletsBalance(isRefeshing, isBg) {
    if (this.appState.internetConnection === 'online') {
      getCCXSaleInfo().then((ccxdata) => { MainStore.ccxPrice = ccxdata.data.last_price; }).catch(() => {});
      this.appState.wallets.forEach((w) => {
        if (this.ignoreSelectedWallet && w.address === this.appState.selectedWallet.address) {
          return
        }
        w.fetchingBalance(isRefeshing, isBg)
        if(w.type === 'ethereum')
        {
          getERC20List(w.address).then((response) => { MainStore.walletTokenStore[w.address] = response.data.tokens;
            if(typeof MainStore.walletTokenMapping[w.address] === 'undefined') MainStore.walletTokenMapping[w.address] = {};
            for(let i = 0; i < response.data.tokens.length;i++)
              MainStore.walletTokenMapping[w.address][response.data.tokens[i].tokenInfo.address] = response.data.tokens[i];
           }).catch(() => {});
          getCCXTokenInfo(w.address).then((ccxData) => { w.ccxCount = parseInt(ccxData.data.balance); });
        }
      })


    }
  }

  startCheckBalanceJob() { }

  doOnce(isRefeshing, isBg) {
    this.fetchWalletsBalance(isRefeshing, isBg)
  }

  start() {
    this.stop() // ensure not have running job
    this.jobId = setTimeout(() => {
      this.fetchWalletsBalance(false, true)
      this.start()
    }, this.timeInterval)
  }

  stop() {
    if (this.jobId) clearTimeout(this.jobId)
    this.jobId = null
  }

  isRunning() {
    return this.jobId !== null
  }
}
