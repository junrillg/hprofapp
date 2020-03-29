import request from 'lib/request'
import { errorHandler, successHandler } from './requestHandler'

export type LoginRequest = {
  email: string
  password: string
}

export const loginAsync = (data: LoginRequest) =>
  request().post('/login', data).then(successHandler).catch(errorHandler)

export const logoutAsync = () =>
  request().post('/logout').then(successHandler).catch(errorHandler)

export const sessionDataAsync = () =>
  request().get('/session').then(successHandler).catch(errorHandler)
