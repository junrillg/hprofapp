import { SET_LOGGED_IN, SET_SESSION_DATA } from './actionTypes'
import { handleActions } from 'redux-actions'

const initialState = {
  loggedIn: false,
  sessionData: {},
}

type State = typeof initialState

const reducer = handleActions<State, boolean>(
  {
    [SET_LOGGED_IN.toString()]: (state, action) => ({
      ...state,
      loggedIn: action.payload,
    }),
    [SET_SESSION_DATA.toString()]: (state, action) => ({
      ...state,
      sessionData: action.payload,
    }),
  },
  initialState
)

export default reducer
