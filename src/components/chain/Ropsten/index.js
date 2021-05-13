import tokens from './tokens.js'
import icon from '@/assets/icons/network.svg'

export default {
  name: 'Ropsten',
  name_long: 'Ropsten',
  homePage: 'https://ropsten.etherscan.io',
  blockExplorerTX: 'https://ropsten.etherscan.io/tx/[[txHash]]',
  blockExplorerAddr: 'https://ropsten.etherscan.io/address/[[address]]',
  chainID: 3,
  icon: icon,
  currencyName: 'ETH',
  tokens: tokens
}
