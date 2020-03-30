import fetch from '../lib/fetch'
import { errorHandler, successHandler } from './requestHandler'

export type UserRequest = {
  email: string
  password: string
  confirmPassword: string
  role?: string
}

export const createUser = (data: UserRequest) =>
  fetch().post('/users', data).then(successHandler).catch(errorHandler)
