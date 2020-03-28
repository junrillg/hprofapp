import firebase from '../util/firebase'
import { Response } from '../util/types'
import db from '../util/db'
import { formatError } from '../util/helper'
import { EMAIL_ALREADY_EXIST } from '../constants/errorCodes'

export const createUserHandler = async (req: any, res: Response) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  try {
    const doc = await db.doc(`users/${newUser.handle}`)
    if ((doc as any).exists) {
      res.status(400).json({ message: `User handle already exist` })
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
          await db.doc(`users/${newUser.handle}`).set({
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId,
          })
          res.status(201).json({
            message: `Successfully created user ${userId}`,
            token: (data as any).user.getIdToken(),
          })
        } catch (e) {
          res.status(500).json({ message: formatError(e.code) })
        }
      } catch (e) {
        res.status(500).json({ message: formatError(e.code) })
        console.error(e)
      }
    }
  } catch (e) {
    if (e.code === EMAIL_ALREADY_EXIST) {
      res.status(400).json({ message: `${newUser.email} is already in use` })
    } else {
      res.status(500).json({ message: formatError(e.code) })
    }
    console.error(e)
  }
}
