import Web3 from 'web3'

export const WALLET = 'Wallet'
export interface Walletload {
  web3: Web3,
  address: string,
  identifier: string,
}
export interface SetWalletAction {
  type: typeof WALLET
  payload: Walletload
}
export const SetWallet = (
  payload: Walletload
): SetWalletAction => ({
  type: WALLET,
  payload
})

export type WalletUnionType = | SetWalletAction
