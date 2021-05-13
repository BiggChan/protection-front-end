export const SIGNIN = 'SIGNIN'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAIL = 'SIGNIN_FAIL'

export interface SigninAction {
  type: typeof SIGNIN
  payload: any
}
export interface SigninSuccessAction {
  type: typeof SIGNIN_SUCCESS
  payload: any
}
export interface SigninFailAction {
  type: typeof SIGNIN_FAIL
  message: string
}

export const signin = (
  payload: any
): SigninAction => ({
  type: SIGNIN,
  payload
})
export const signinSuccess = (payload: any): SigninSuccessAction => ({
  type: SIGNIN_SUCCESS,
  payload
})

export const signinFail = (message: string): SigninFailAction => ({
  type: SIGNIN_FAIL,
  message
})

export type AuthUnionType = SigninAction | SigninSuccessAction | SigninFailAction
