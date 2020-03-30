import { takeEvery, call, put } from 'redux-saga/effects'
import { loginAsync, sessionDataAsync } from 'api/generalAPI'
import { setLoggedIn, setSessionData } from 'features/session/sessionActions'
import { LOG_IN } from 'features/session/actionTypes'
import { setToken } from '../lib/storage'

export type LoginAction = {
  payload: {
    email: string
    password: string
  }
}

function* loginSagaAsync(action: LoginAction) {
  try {
    const data = yield call(loginAsync, action.payload)
    setToken(data.token)
    yield put(setLoggedIn(true))
  } catch (e) {
    yield put(setLoggedIn(false))
  }
}

function* generalSagas() {
  // @ts-ignore
  yield takeEvery(LOG_IN, loginSagaAsync)
}

export default generalSagas
