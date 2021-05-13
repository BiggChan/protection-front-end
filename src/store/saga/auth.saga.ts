import { put, takeEvery } from 'redux-saga/effects'

import {
  SIGNIN,
  SigninAction,
  // signinSuccess,
  signinFail
} from '../actions/account.actions'

function * handleSignin(action: SigninAction) {
  try {
    // const response = yield axios.post(`${API}/signin`, action.payload)
    // yield put(signinSuccess())
  } catch (error) {
    yield put(signinFail(error.response.data.error))
  }
}

export default function * authSaga() {
  // 登录
  yield takeEvery(SIGNIN, handleSignin)
}
