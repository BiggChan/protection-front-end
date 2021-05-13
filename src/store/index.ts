import { routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import createRootReducer from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'

export const history = createHashHistory()
const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(routerMiddleware(history)))
)

export default store
