import fs from '../util/fs'
import db from '../util/db'
import { Response } from '../util/types'
import { HOUSEHOLDS } from '../constants/collection'

export const createHouseHoldHandler = async (req: any, res: Response) => {
  const newHouseHold = {
    clusterHandle: req.body.clusterId,
    data: req.body.data,
    createdAt: fs.Timestamp.fromDate(new Date()),
  }

  try {
    const doc = await db.collection(HOUSEHOLDS).add(newHouseHold)
    res.json({ message: `Successfully created Household! Ref #${doc.id}` })
  } catch (e) {
    res.status(400).json(`Unable to add household`)
    console.error(e)
  }
}
