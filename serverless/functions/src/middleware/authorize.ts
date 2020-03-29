import { Response, User } from '../util/types'
import { CLUSTERS, USERS } from '../constants/collection'
import dataService from '../services/dataService'
import { verifyToken } from '../services/authService'
import { includes } from '../util/helper'
import { ADMIN } from '../constants/roles'

const BEARER = 'Bearer '

const userService = dataService(USERS)
const clusterService = dataService(CLUSTERS)

export type AuthorizeOptions = {
  exclude: string[]
}

const authorize = (options: AuthorizeOptions) => {
  return async (req: any, res: Response, next: any) => {
    // skip route
    if (includes(options.exclude, req.originalUrl)) {
      return next()
    }
    const validToken =
      req.headers.authorization && req.headers.authorization.startsWith(BEARER)
    const invalidUser = () =>
      res
        .status(401)
        .json({ message: `Sorry, your request could not be processed` })
    if (validToken) {
      const token = req.headers.authorization.replace(BEARER, '')
      const decodedToken = await verifyToken(token)
      if (!decodedToken) return invalidUser()
      const data = await userService.getDataWithPredicate([
        'userId',
        '==',
        (decodedToken as any).uid,
      ])
      const user = data as User
      const cluster =
        user.role === ADMIN
          ? await clusterService.getDataById(user.clusterId)
          : {}
      if (data) {
        req.user = {
          ...data,
          cluster,
        }
        next()
      } else {
        return invalidUser()
      }
    } else {
      return invalidUser()
    }
  }
}

export default authorize
