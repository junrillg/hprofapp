import { STAFF, SUPER_ADMIN } from '../constants/roles'

export const getUserRole = (loginUserRole: string, roleValue: string) =>
  loginUserRole !== SUPER_ADMIN ? STAFF : roleValue
