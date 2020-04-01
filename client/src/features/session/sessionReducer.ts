import { SET_LOADING, SET_LOGGED_IN, SET_SESSION_DATA } from './actionTypes'
import { handleActions } from 'redux-actions'

const initialState = {
  loggedIn: false,
  appInit: false,
  data: {},
  loading: false,
}

type State = typeof initialState

const reducer = handleActions<State, boolean>(
  {
    [SET_LOGGED_IN.toString()]: (state, action) => ({
      ...state,
      appInit: true,
      loggedIn: action.payload,
    }),
    [SET_SESSION_DATA.toString()]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    [SET_LOADING.toString()]: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
  },
  initialState
)

export default reducer
