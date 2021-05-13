import { SIGNIN, AuthUnionType, SIGNIN_SUCCESS, SIGNIN_FAIL } from '../actions/account.actions'

export interface AuthState {
  loaded: boolean,
  success: boolean,
  message: string,
  balance: number,
  balanceString: string,
  address: string | null,
  identifier: string
}
const intialState: AuthState = {
  loaded: false,
  success: false,
  message: '',
  balance: 0,
  balanceString: '0',
  address: null,
  identifier: ''
}

export default function accountReducer(state = intialState, action: AuthUnionType) {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        loaded: false,
        success: false
      }
    case SIGNIN_SUCCESS:
      return {
        ...state,
        loaded: true,
        success: true,
        ...action.payload
      }
    case SIGNIN_FAIL:
      return {
        ...state,
        loaded: true,
        success: false,
        message: action.message
      }
    default:
      return state
  }
}
