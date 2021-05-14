import Web3 from 'web3'
import { WALLET, WalletUnionType } from '../actions/wallet.actions'

export interface WalletState {
  address:string,
  identifier:string,
  web3:Web3|null
}
const intialState: WalletState = {
  address: '',
  identifier: '',
  web3: null
}

export default function WalletReducer(
  state = intialState,
  action: WalletUnionType
) {
  switch (action.type) {
    case WALLET:
      return {
        ...state,
        address: action.payload.address,
        identifier: action.payload.identifier,
        web3: action.payload.web3
      }
    default:
      return state
  }
}
