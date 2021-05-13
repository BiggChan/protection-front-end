import Web3 from 'web3'
import { getBufferFromHex } from '@/utils/hexUtil'
import errorHandler from './errorHandler'
import { WEB3_WALLET } from '@/constant'
import { bufferToHex } from 'ethereumjs-util'

class Web3Wallet {
  constructor(address) {
    //
    this.identifier = WEB3_WALLET
    this.address = address
    //
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum)
    } else {
      this.web3 = new Web3(window.web3.currentProvider)
    }
    if (!this.web3) throw new Error('No Web3 instance found')
  }

  signTransaction(tx) {
    tx.from = this.getAddressString()
    return this.web3.eth.sendTransaction(tx)
  }

  signMessage(msg) {
    return new Promise(resolve => {
      this.web3.eth.personal
        .sign(msg, this.getAddressString())
        .then(hex => {
          resolve(getBufferFromHex(hex))
        })
        .catch(errorHandler)
    })
  }

  getAddress() {
    return this.address
  }

  getAddressString() {
    return bufferToHex(this.getAddress())
  }
}

export default Web3Wallet
