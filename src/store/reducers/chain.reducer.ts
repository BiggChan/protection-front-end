import { getChainByID } from '../../support/chain'
import { CHAIN, ChainUnionType } from '../actions/chain.actions'

export interface ChainState {
  chain: any
}
const intialState: ChainState = {
  chain: null
}

export default function ChainReducer(
  state = intialState,
  action: ChainUnionType
) {
  switch (action.type) {
    case CHAIN:
      return {
        ...state,
        chain: getChainByID(action.chain)
      }
    default:
      return state
  }
}
