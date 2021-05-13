import tokens from './tokens.js'
import icon from '@/assets/icons/network.svg'

export default {
  name: 'Rinkeby',
  name_long: 'Rinkeby',
  homePage: 'https://rinkeby.etherscan.io/',
  blockExplorerTX: 'https://rinkeby.etherscan.io/tx/[[txHash]]',
  blockExplorerAddr: 'https://rinkeby.etherscan.io/address/[[address]]',
  chainID: 4,
  icon: icon,
  currencyName: 'ETH',
  tokens: tokens
}
