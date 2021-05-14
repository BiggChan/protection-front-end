import { ACCOUNT, ChainUnionType } from '../actions/account.actions'

export interface AccountState {
    balance: number
    balanceString: string
    address: string | null
    identifier: string
}
const intialState: AccountState = {
  balance: 0,
  balanceString: '0',
  address: null,
  identifier: ''
}

export default function AccountReducer(
  state = intialState,
  action: ChainUnionType
) {
  switch (action.type) {
    case ACCOUNT:
      return {
        ...state,
        balance: action.payload.balance,
        balanceString: action.payload.balanceString,
        address: action.payload.address,
        identifier: action.payload.identifier
      }
    default:
      return state
  }
}
