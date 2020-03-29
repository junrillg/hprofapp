import { Response, User } from '../util/types'
import { HOUSEHOLDS } from '../constants/collection'
import { ValidatedRequest } from 'express-joi-validation'
import { HouseholdRequestSchema } from '../schema/households'
import { IdParamsSchema } from '../schema/common'
import dataService from '../services/dataService'
import { constructData } from '../util/helper'

const householdService = dataService(HOUSEHOLDS)

/**
 * Create New Household
 * @param req
 * @param res
 */
export const createHouseHoldHandler = async (
  req: ValidatedRequest<HouseholdRequestSchema>,
  res: Response
) => {
  const newHouseHold = constructData(req)
  try {
    await householdService.createData(newHouseHold)
    res.json({ message: `Household successfully created!` })
  } catch (e) {
    res.status(400).json(e)
  }
}

/**
 * Retrieve all household based on cluster
 * @param req
 * @param res
 */
export const getAllHouseholdByCluster = async (
  req: ValidatedRequest<IdParamsSchema>,
  res: Response
) => {
  try {
    const data = await householdService.getAllDataWithPredicate([
      'clusterId',
      '==',
      ((req as any).user as User).clusterId,
    ])
    res.status(200).json(data)
  } catch (e) {
    res.status(400).json(e)
  }
}

/**
 * Retrieve household based on doc id
 * @param req
 * @param res
 */
export const getHouseholdByIdHandler = async (
  req: ValidatedRequest<IdParamsSchema>,
  res: Response
) => {
  try {
    const data = await householdService.getDataById(req.params.id)
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(400).json({ message: `Household doesn't exist` })
    }
  } catch (e) {
    res.status(400).json(e)
  }
}

/**
 * Update existing household
 * @param req
 * @param res
 */
export const updateHouseholdHandler = async (
  req: ValidatedRequest<HouseholdRequestSchema>,
  res: Response
) => {
  try {
    const data = await householdService.getDataById(req.params.id)
    if (data) {
      try {
        await householdService.updateData(req.params.id, req.body)
        res.status(200).json({ message: 'Household successfully updated!' })
      } catch (e) {
        res.status(400).json(e)
      }
    } else {
      res.status(400).json({ message: `Household doesn't exist` })
    }
  } catch (e) {
    res.status(400).json(e)
  }
}

/**
 * Delete household
 * @param req
 * @param res
 */
export const deleteHouseholdHandler = async (
  req: ValidatedRequest<IdParamsSchema>,
  res: Response
) => {
  try {
    await householdService.deleteData(req.params.id)
    res.status(200).json({ message: `Household successfully deleted!` })
  } catch (e) {
    res.status(400).json(e)
  }
}
