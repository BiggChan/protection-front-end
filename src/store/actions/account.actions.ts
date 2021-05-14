export const ACCOUNT = 'Account'

export interface Accountload{
  address:string,
  identifier:string,
  balanceString: string,
  balance:number
}
export interface SetAccountAction {
  type: typeof ACCOUNT,
  payload:Accountload
}
export const SetAccount = (
  payload:Accountload
): SetAccountAction => ({
  type: ACCOUNT,
  payload
})

export type ChainUnionType = | SetAccountAction
