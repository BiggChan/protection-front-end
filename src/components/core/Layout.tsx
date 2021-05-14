import React, { FC } from 'react'
import Navigation from './Navigation'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { SetWallet } from '../../store/actions/wallet.actions'
import { SetChain } from '../../store/actions/chain.actions'
import { wEthereum } from '../../utils/windowUtil'
import Web3Wallet from '../../support/web3/wallet'
import web3Utils from 'web3-utils'
import { WEB3_WALLET } from '../../constant'

interface Props {
  children: React.ReactNode | string
}

const Layout: FC<Props> = ({ children }) => {
  let pollChainTimeObj:any = null
  let pollAccountAddressTimeObj:any = null
  const web3 = useSelector((state:any) => state.web3)
  const account = useSelector((state:any) => state.account)
  const dispatch = useDispatch()

  const pollWeb3WalletNetwork = () => {
    if (!web3.eth) {
      throw new Error('web3 not found')
    }
    if (!web3.eth.net || typeof web3.eth.net.getId !== 'function') {
      return
    }

    pollChainTimeObj = setInterval(() => {
      web3.eth.net.getId().then((id:string) => {
        dispatch(SetChain(id))
        clearInterval(pollChainTimeObj)
      }).catch((e:any) => {
        throw e
      })
    }, 500)
  }

  const pollWeb3WalletAccountAddress = () => {
    pollAccountAddressTimeObj = setInterval(() => {
      if (!web3.eth) {
        throw new Error('web3 not found')
        // clearInterval(pollAccountAddressTimeObj)
      }
      // 获取到账户
      web3.eth.getAccounts((err:string, accounts:string[]) => {
        if (err) {
          throw new Error('Get accounts error' + err)
          // clearInterval(pollAccountAddressTimeObj)
        }
        if (!accounts.length) {
          throw new Error('Please make sure that your Web3 Wallet is unlocked')
          // clearInterval(pollAccountAddressTimeObj)
        }
        const address = accounts[0]
        if (account.address !== null && address.toLowerCase() !== account.address.toLowerCase()) {
          // 钱包对象
          console.log(2222)

          dispatch(SetWallet(new Web3Wallet(address)))
          clearInterval(pollAccountAddressTimeObj)
        }
      })
    }, 500)
  }

  const checkWeb3WalletAccountAddressChange = () => {
    wEthereum.on('accountsChanged', (account:string[]) => {
      if (account.length > 0) {
        dispatch(SetWallet(new Web3Wallet(account[0])))
      }
    })
  }

  const checkWeb3WalletNetwork = () => {
    web3.eth.net.getId().then((id:string) => {
      dispatch(SetChain(id))
    })
    wEthereum.on('networkChanged', (id:string) => {
      dispatch(SetChain(id))
    })
  }
  const afterConnectWallet = () => {
    // web3Utils._.debounce(function() {
    clearIntervals()
    if (account.address !== null && account.identifier === WEB3_WALLET) {
      if (wEthereum.isMetaMask) {
        checkWeb3WalletAccountAddressChange()
        checkWeb3WalletNetwork()
      } else {
        pollWeb3WalletNetwork()
        pollWeb3WalletAccountAddress()
      }
    }
    // })
  }
  const clearIntervals = () => {
    clearInterval(pollChainTimeObj)
    clearInterval(pollAccountAddressTimeObj)
  }
  return (
    <div>
      <Navigation />
      <Header afterConnectWallet={afterConnectWallet} />
      {children}
    </div>
  )
}

export default Layout
