import Rinkeby from './Rinkeby'
import Ropsten from './Ropsten'

const chainList = [Rinkeby, Ropsten]
const getChainByID = (chainID) => {
  let chain
  for (const index in chainList) {
    if (chainID + '' === chainList[index].chainID + '') {
      chain = chainList[index]
      break
    }
  }
  return chain
}

export { chainList, getChainByID }
