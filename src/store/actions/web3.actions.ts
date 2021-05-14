export const WEB3 = 'WEB3'

export interface SetWeb3Action {
  type: typeof WEB3
  web3: any
}
export const SetWeb3 = (
  web3: any
): SetWeb3Action => ({
  type: WEB3,
  web3
})

export type Web3UnionType = | SetWeb3Action
