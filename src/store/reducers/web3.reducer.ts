import { WEB3, Web3UnionType } from '../actions/web3.actions'

export interface Web3State {
  web3: any
}
const intialState: Web3State = {
  web3: null
}

export default function web3Reducer(
  state = intialState,
  action: Web3UnionType
) {
  switch (action.type) {
    case WEB3:
      return {
        ...action.web3
      }
    default:
      return state
  }
}
