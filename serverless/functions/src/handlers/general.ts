import { ValidatedRequest } from 'express-joi-validation'
import { LoginBodySchema } from '../schema/general'
import { Response } from '../util/types'
import {
  getToken,
  loginAuthUser,
  logoutAuthUser,
} from '../services/authService'

export const loginHandler = async (
  req: ValidatedRequest<LoginBodySchema>,
  res: Response
) => {
  try {
    const data = await loginAuthUser(req.body.email, req.body.password)
    const token = await getToken(data)
    res.status(200).json({ token })
  } catch (e) {
    res.status(400).json(e)
  }
}

export const logoutHandler = async (req: any, res: Response) => {
  try {
    await logoutAuthUser()
    res.status(200).json({ message: `Logout successfully!` })
  } catch (e) {
    res.status(400).json(e)
  }
}

export const sessionHandler = async (req: any, res: Response) => {
  if (req.user) {
    res.status(200).json(req.user)
  } else {
    res.status(400).json({ message: 'No session found!' })
  }
}
