import swap from './abi/swap.json'
import factory from './abi/factory.json'
import lpAbi from './abi/lp_abi.json'
import LiquidityProtectionStore from './abi/LiquidityProtectionStore.json'
import DSToken from './abi/DSToken.json'
import ERC20Token from './abi/ERC20Token.json'

export default {
  swap: {
    address: '0x0000000000000000000000000000000000000000',
    abi: swap
  },
  factory: {
    address: '0x0000000000000000000000000000000000000000',
    abi: factory,
    initCodeHash: '0x0000000000000000000000000000000000000000000000000000000000000000'
  },
  xxxxxxxxxx: {
    address: '0x0000000000000000000000000000000000000000',
    abi: []
  },
  lp: {
    eth_bnt: {
      address: '0x1aCE5DD13Ba14CA42695A905526f2ec366720b13',
      abi: lpAbi
    },
    xxx_bnt: {
      address: '0x6DC51c45f409385Fc99a1c7B316D7fab15d66474',
      abi: lpAbi
    }
  },
  LiquidityProtectionStore: {
    address: '0xc58F4A9269cde6f9A788E4E59132982AF95fB41C',
    abi: LiquidityProtectionStore
  },
  DSToken: {
    address: '0x1aCE5DD13Ba14CA42695A905526f2ec366720b13',
    abi: DSToken
  },
  ERC20Token: {
    address: '0x34748F3E5cDDBbb7C2a7BEc888fEf3873a462dE7',
    abi: ERC20Token
  }
}
