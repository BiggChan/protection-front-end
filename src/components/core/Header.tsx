import { Button, Descriptions } from 'antd'
import React from 'react'
import { wEthereum, Wweb3 } from '../../utils/windowUtil'
import Web3 from 'web3'
import { useDispatch } from 'react-redux'
import { signin } from '../../store/actions/account.actions'
import { SetWeb3 } from '../../store/actions/web3.actions'

const Header = () => {
  const dispatch = useDispatch()
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
        await (wEthereum as any).enable()
      } catch (e) {
        if (e.stack && e.stack.includes('Error: User denied account authorization')) {
          throw e
        }
        return
      }
      const web3Obj = new Web3(wEthereum as any)
      dispatch(SetWeb3((web3Obj as any)._provider))
      dispatch(signin(web3Obj))
      // this.setWeb3(web3Obj._provider)
      // await that.signIn(web3Obj, 'ethereum')
    } else if (Wweb3 as any) {
      // web3
      dispatch(SetWeb3((Wweb3 as any)._provider))
      dispatch(signin(Wweb3))
      // this.setWeb3(Wweb3._provider)
      // await that.signIn(Wweb3)
    }
  }
  // 钱包已连接
  const WalletConnected = () => {
    return (
      <>
        <Descriptions.Item label='账户余额：'>Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label='账户地址：'>1810000000</Descriptions.Item>
        <Descriptions.Item label='当前网络：'>Hangzhou, Zhejiang</Descriptions.Item>
      </>
    )
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
