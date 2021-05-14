import { connectRouter, RouterState } from 'connected-react-router'
import { combineReducers } from 'redux'
import web3Reducer from './web3.reducer'
import walletReducer from './wallet.reducer'
import accountReducer from './account.reducer'
import chainReducer from './chain.reducer'
import { History } from 'history'

export interface AppState {
  router: RouterState
}
export interface reducerType {
  web3:any,
  account:any,
  wallet:any,
  chain:any,
  router:any
}
const createRootReducer = (history: History) => combineReducers({
  web3: web3Reducer,
  account: accountReducer,
  wallet: walletReducer,
  chain: chainReducer,
  router: connectRouter(history)
})

export default createRootReducer
