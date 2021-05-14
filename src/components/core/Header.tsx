import { Button, Descriptions } from 'antd'
import React, { FC, useEffect } from 'react'
import { wEthereum, Wweb3 } from '../../utils/windowUtil'
import Web3 from 'web3'
import { useDispatch, useSelector } from 'react-redux'
import Web3Wallet from '../../support/web3/wallet'
// import { signin } from '../../store/actions/account.actions'
import { SetWeb3 } from '../../store/actions/web3.actions'
import { SetWallet } from '../../store/actions/wallet.actions'
import { reducerType } from '../../store/reducers'
import { SetAccount } from '../../store/actions/account.actions'

interface Props {
  afterConnectWallet:()=>void
}
const Header :FC<Props> = ({ afterConnectWallet }) => {
  const dispatch = useDispatch()
  const web3 = useSelector((state:reducerType) => state.web3)
  const chain = useSelector((state:reducerType) => state.chain)
  const account = useSelector((state:reducerType) => state.account)

  useEffect(() => {
    if (account.address) {
      loadBalance()
      afterConnectWallet()
    }
  }, [account.address])
  // 钱包未连接
  const WalletNotConnect = () => {
    return (
      <Descriptions.Item>
        <Button type='primary' onClick={connectHandler}>连接钱包</Button>
      </Descriptions.Item>
    )
  }
  const connectHandler = async () => {
    if (wEthereum) {
      try {
        await wEthereum.enable()
      } catch (e) {
        if (e.stack && e.stack.includes('Error: User denied account authorization')) {
          throw e
        }
        return
      }

      const web3Obj = new Web3(wEthereum)
      dispatch(SetWeb3(web3Obj))
      await signIn(web3Obj)
    } else if (Wweb3 as any) {
      // web3
      dispatch(SetWeb3((Wweb3 as any)._provider))
      await signIn(Wweb3)
    }
  }
  const signIn = async (web3Obj:any) => {
    try {
      const accounts = await web3Obj.eth.getAccounts()
      const web3Wallet = new Web3Wallet(accounts[0])
      // 钱包对象
      dispatch(SetWallet(web3Wallet))
      dispatch(SetAccount({
        address: web3Wallet.address,
        identifier: web3Wallet.identifier,
        balanceString: account.balanceString,
        balance: account.balance
      }))
    } catch (e) {
      if (e.stack && e.stack.includes('Error: User denied account authorization')) {
        throw e
      }
    }
  }
  // 钱包已连接
  const WalletConnected = () => {
    return (
      <>
        <Descriptions.Item label='账户余额：'>{ account.balance } { chain.currencyName }</Descriptions.Item>
        <Descriptions.Item label='账户地址：'>{account.address}</Descriptions.Item>
        <Descriptions.Item label='当前网络：'>{chain.name}</Descriptions.Item>
      </>
    )
  }
  const Wallet = () => {
    if (chain.name) {
      return WalletConnected()
    } else {
      return WalletNotConnect()
    }
  }
  const loadBalance = () => {
    if (account.address) {
      web3.eth.getBalance(account.address.toLowerCase()).then((balance:number) => {
        dispatch(SetAccount({
          ...account,
          balance: balance
        }))
      }).catch((e:any) => {
        console.log(e)
      })
    }
  }
  return (
    <>
      <Descriptions title='钱包信息'>
      {WalletConnected()}
      {WalletNotConnect()}
      </Descriptions>
    </>
  )
}

export default Header
