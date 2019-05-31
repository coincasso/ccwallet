import MainStore from '../MainStore'
import SendStore from '../../modules/SendTransaction/stores/SendStore'
import NavStore from '../NavStore'

class SendTransaction {
  goToSendTx(param = null) {
    MainStore.sendTransaction = new SendStore()

    if(param != null)
    {
      MainStore.erc20 = true;
      MainStore.erc20Source = param.erc20Source;
      MainStore.sendTransaction.overfix = MainStore.walletTokenMapping[param.erc20Source][param.erc20].tokenInfo.symbol;
      MainStore.selectedErcToken = MainStore.walletTokenMapping[param.erc20Source][param.erc20];
    }
    else
    {
      MainStore.erc20 = false;
    }

    NavStore.pushToScreen('SendTransactionStack', param)
  }
}

export default new SendTransaction()
