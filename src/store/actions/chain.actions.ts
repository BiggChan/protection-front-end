export const CHAIN = 'Chain'

export interface SetChainAction {
  type: typeof CHAIN
  chain: any
}
export const SetChain = (
  chain: any
): SetChainAction => ({
  type: CHAIN,
  chain
})

export type ChainUnionType = | SetChainAction
