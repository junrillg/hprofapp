import { ValidatedRequest } from 'express-joi-validation'
import { EMAIL_ALREADY_EXIST } from '../constants/errorCodes'
import { USERS } from '../constants/collection'
import firebase from '../util/firebase'
import { Response } from '../util/types'
import db from '../util/db'
import { btoa } from '../util/helper'
import { UserRequestSchema } from '../schema/users'

export const createUserHandler = async (
  req: ValidatedRequest<UserRequestSchema>,
  res: Response
) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: btoa(req.body.email),
  }

  try {
    const doc = await db.doc(`/${USERS}/${newUser.handle}`)
    if ((doc as any).exists) {
      res.status(400).json({ message: `${newUser.email} is already in use` })
    } else {
      try {
        const data = await firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
        if (!data)
          return res
            .status(400)
            .json({ message: 'Error when creating new user' })
        const userId = (data as any).user.uid
        try {
          await db.doc(`${USERS}/${newUser.handle}`).set({
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId,
          })
          const token = await (data as any).user.getIdToken()
          res.status(201).json({
            message: `Successfully created user!`,
            token,
          })
        } catch (e) {
          res.status(500).json({ message: e.message })
        }
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  } catch (e) {
    if (e.code === EMAIL_ALREADY_EXIST) {
      res.status(400).json({ message: `${newUser.email} is already in use` })
    } else {
      res.status(500).json({ message: e.code })
    }
    console.error(e)
  }
}
