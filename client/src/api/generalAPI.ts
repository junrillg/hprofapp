import fetch from 'lib/fetch'
import { errorHandler, successHandler } from './requestHandler'

export type LoginRequest = {
  email: string
  password: string
}

export const loginAsync = (data: LoginRequest) =>
  fetch().post('/login', data).then(successHandler).catch(errorHandler)

export const logoutAsync = () =>
  fetch().post('/logout').then(successHandler).catch(errorHandler)

export const fetchSessionDataAsync = () =>
  fetch().get('/session').then(successHandler).catch(errorHandler)
