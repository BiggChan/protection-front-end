import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'

const getSigner = (provider, account) => {
  return provider.getSigner(account).connectUnchecked()
}

const getProviderOrSigner = (provider, account) => {
  return account ? this.getSigner(provider, account) : provider
}

const newContract = (address, abi, provider, accountAddress) => {
  return new Contract(address, abi, this.getProviderOrSigner(provider, accountAddress))
}

const calculateGasMargin = (value) => {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

export {
  getSigner,
  getProviderOrSigner,
  newContract,
  calculateGasMargin
}
