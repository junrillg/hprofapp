import { createAction } from 'redux-actions'
import * as actionTypes from './actionTypes'

export const setLoggedIn = createAction(actionTypes.SET_LOGGED_IN)
export const setSessionData = createAction(actionTypes.SET_SESSION_DATA)
export const login = createAction(actionTypes.LOG_IN)
export const fetchUserSession = createAction(actionTypes.FETCH_USER_SESSION)
