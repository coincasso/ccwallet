import caller from './api-caller'
import URL from './url'

const ccxContractId = '0x395dc9a82e3eef962b0355a3d4e6819e9af776d2';

/**
 *
 * @param {String} address
 */
export const fetchToken = (address) => {
  if (!address) return Promise.reject()
  const url = `${URL.Skylab.apiURL()}/balance/${address}`
  return caller.get(url, {}, true)
}

export const fetchCollectibles = (address) => {
  const url = `${URL.OpenSea.apiURL()}/assets`
  const data = {
    limit: 100,
    order_by: 'auction_created_date',
    order_direction: 'desc',
    owner: address
  }
  return caller.get(url, data, true)
}

export const fetchTokenDetail = (address, contract) => {
  const url = `${URL.Skylab.apiURL()}/balance/${address}/${contract}`
  return caller.get(url, {}, true)
}

export const getSentTime = (from, to) => {
  const data = {
    from,
    to
  }
  const url = `${URL.Skylab.apiURL()}/transactions/count`
  return caller.get(url, data, true)
}

export const getCCXTokenInfo = (address) => {
  const url = `${URL.TokenBalance.apiURL()}/token/${ccxContractId}/${address}`;
  return caller.get(url, {}, true)
}

export const getCCXSaleInfo = () => {
  return caller.get(URL.CoinCasso.tokenInfoAPI(), {}, true)
}

export const getERC20List = (address) => {
  return caller.get(`${URL.Ethplorer.apiURL()}/getAddressInfo/${address}?apiKey=freekey`, {}, true);
}
