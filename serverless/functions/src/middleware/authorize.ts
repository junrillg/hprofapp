import * as unless from 'express-unless'
import { Response } from '../util/types'
import { USERS } from '../constants/collection'
import dataService from '../services/dataService'
import { verifyToken } from '../services/authService'

const BEARER = 'Bearer '

const userService = dataService(USERS)

const authorize = () => {
  const handler = async (req: any, res: Response, next: any) => {
    const validToken =
      req.headers.authorization && req.headers.authorization.startsWith(BEARER)
    const invalidUser = () =>
      res
        .status(401)
        .json({ message: `Sorry, your request could not be processed ` })
    if (validToken) {
      const token = req.headers.authorization.replace(BEARER, '')
      const decodedToken = verifyToken(token)
      if (!decodedToken) return invalidUser()
      const data = await userService.getDataWithPredicate([
        'userId',
        '==',
        (decodedToken as any).uid,
      ])
      if (data) {
        req.user = data
        next()
      } else {
        return invalidUser()
      }
    } else {
      return invalidUser()
    }
  }
  handler.unless = unless
  return handler
}

export default authorize
