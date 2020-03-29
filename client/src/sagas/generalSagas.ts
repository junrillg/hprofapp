import { takeEvery, call, put } from 'redux-saga/effects'
import { loginAsync, sessionDataAsync } from 'api/generalAPI'
import { setLoggedIn, setSessionData } from 'features/session/sessionActions'
import { LOG_IN } from 'features/session/actionTypes'

export type LoginAction = {
  payload: {
    email: string
    password: string
  }
}

function* loginSagaAsync(action: LoginAction) {
  try {
    yield call(loginAsync, action.payload)
    yield put(setLoggedIn(false))
    const sessionData = yield call(sessionDataAsync)
    yield put(setSessionData(sessionData))
  } catch (e) {
    yield put(setLoggedIn(false))
  }
}

function* generalSagas() {
  // @ts-ignore
  yield takeEvery(LOG_IN, loginSagaAsync)
}

export default generalSagas
