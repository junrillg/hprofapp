import fs from '../util/fs'
import db from '../util/db'
import { Response } from '../util/types'
import { HOUSEHOLDS } from '../constants/collection'
import { ValidatedRequest } from 'express-joi-validation'
import { HouseholdRequestSchema } from '../schema/household'

export const createHouseHoldHandler = async (
  req: ValidatedRequest<HouseholdRequestSchema>,
  res: Response
) => {
  const newHouseHold = {
    ...req.body,
    createdAt: fs.Timestamp.fromDate(new Date()),
  }

  try {
    await db.collection(HOUSEHOLDS).add(newHouseHold)
    res.json({ message: `Successfully created Household!` })
  } catch (e) {
    res.status(400).json(`Unable to add household`)
    console.error(e)
  }
}
