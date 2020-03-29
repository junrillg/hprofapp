import { ValidatedRequest } from 'express-joi-validation'
import { EMAIL_ALREADY_EXIST } from '../constants/errorCodes'
import { USERS } from '../constants/collection'
import { Response, User } from '../util/types'
import { btoa } from '../util/helper'
import { UserBodySchema } from '../schema/users'
import dataService from '../services/dataService'
import { createAuthUser } from '../services/authService'
import { getUserRole } from '../util/user'

const userService = dataService(USERS)

/**
 * Create new user
 * @param req
 * @param res
 */
export const createUserHandler = async (
  req: ValidatedRequest<UserBodySchema>,
  res: Response
) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: btoa(req.body.email),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  }

  try {
    const user = await userService.getDataById(newUser.handle)
    if (user) {
      res.status(400).json({ message: `${newUser.email} is already in use` })
    } else {
      try {
        const data = await createAuthUser(newUser.email, newUser.password)
        if (!data)
          return res
            .status(400)
            .json({ message: 'Error when creating a new user' })
        const userId = (data as any).user.uid
        try {
          await userService.updateData(newUser.handle, {
            handle: newUser.handle,
            email: newUser.email,
            userId,
            role: getUserRole(((req as any).user as User).role, req.body.role),
            clusterId: ((req as any).user as User).clusterId,
            createdAt: new Date().toISOString(),
            createdBy: `${((req as any).user as User).firstName} ${
              ((req as any).user as User).lastName
            }`,
          })
          res.status(201).json({
            message: `User successfully created!`,
          })
        } catch (e) {
          res.status(500).json(e)
        }
      } catch (e) {
        res.status(500).json(e)
      }
    }
  } catch (e) {
    if (e.code === EMAIL_ALREADY_EXIST) {
      res.status(400).json({ message: `${newUser.email} is already in use` })
    } else {
      res.status(500).json(e)
    }
  }
}
