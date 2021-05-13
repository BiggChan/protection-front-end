import { connectRouter, RouterState } from 'connected-react-router'
import { combineReducers } from 'redux'
import accountReducer from './account.reducer'
import walletReducer from './wallet.reducer'
import { History } from 'history'

export interface AppState {
  router: RouterState
}

const createRootReducer = (history: History) => combineReducers({
  account: accountReducer,
  wallet: walletReducer,
  router: connectRouter(history)
})

export default createRootReducer
