import Rinkeby from './Rinkeby'
import Ropsten from './Ropsten'

// const contracts = {
//   4: { ...Rinkeby },
//   3: { ...Ropsten }
// }

// const getContractsByChainID = chainID => {
//   debugger
//   let retContracts = undefined
//   for (let key in contracts) {
//     if (chainID + '' === key + '') {
//       retContracts = contracts
//       break
//     }
//   }
//   debugger
//   return retContracts
// }

export default {
  4: { ...Rinkeby },
  3: { ...Ropsten }
}
