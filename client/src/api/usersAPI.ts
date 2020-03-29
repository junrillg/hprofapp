import request from '../lib/request'
import { errorHandler, successHandler } from './requestHandler'

export type UserRequest = {
  email: string
  password: string
  confirmPassword: string
  role?: string
}

export const createUser = (data: UserRequest) =>
  request().post('/users', data).then(successHandler).catch(errorHandler)
