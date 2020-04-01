import { takeEvery, call, put } from 'redux-saga/effects'
import { fetchSessionDataAsync, loginAsync, logoutAsync } from 'api/generalAPI'
import {
  setLoading,
  setLoggedIn,
  setSessionData,
} from 'features/session/sessionActions'
import {
  FETCH_USER_SESSION,
  LOG_IN,
  LOG_OUT,
} from 'features/session/actionTypes'
import { removeToken, setToken } from 'lib/storage'

export type LoginAction = {
  payload: {
    email: string
    password: string
  }
}

function* loginSagaAsync(action: LoginAction) {
  try {
    yield put(setLoading(true))
    const data = yield call(loginAsync, action.payload)
    setToken(data.token)
    yield put(setLoggedIn(true))
    yield put(setLoading(false))
  } catch (e) {
    yield put(setLoggedIn(false))
  }
}

function* logoutSagaAsync() {
  try {
    yield call(logoutAsync)
    removeToken()
    yield put(setLoggedIn(false))
  } catch (e) {
    yield put(setLoggedIn(false))
  }
}

function* fetchUserSessionAsync() {
  try {
    const data = yield call(fetchSessionDataAsync)
    yield put(setSessionData(data))
    yield put(setLoggedIn(true))
  } catch (e) {
    yield put(setSessionData({}))
    yield put(setLoggedIn(false))
  }
}

function* generalSagas() {
  // @ts-ignore
  yield takeEvery(LOG_IN, loginSagaAsync)
  yield takeEvery(LOG_OUT, logoutSagaAsync)
  yield takeEvery(FETCH_USER_SESSION, fetchUserSessionAsync)
}

export default generalSagas
