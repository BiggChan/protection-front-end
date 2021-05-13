import { Manager as Web3RequestManager } from 'web3-core-requestmanager'
import MiddleWare from './middleware'
import { ethGetTransactionCount, ethSendTransaction, ethSign, ethSignTransaction } from './methods'

class Provider {
  constructor(provider, options, store, eventHub) {
    this.provider = Object.assign({}, provider)
    const requestManager = new Web3RequestManager(provider)
    options = options || null
    if (this.provider.sendAsync) {
      this.provider.send = this.provider.sendAsync
      delete this.provider.sendAsync
    }
    this.provider.send_ = this.provider.send
    delete this.provider.send
    this.provider.send = (payload, callback) => {
      const req = { payload, store, requestManager, eventHub }
      const middleware = new MiddleWare()
      middleware.use(ethSendTransaction)
      middleware.use(ethSignTransaction)
      middleware.use(ethGetTransactionCount)
      middleware.use(ethSign)
      middleware.run(req, callback).then(() => {
        this.provider.send_(payload, callback)
      })
    }
    return this.provider
  }
}

export default Provider
