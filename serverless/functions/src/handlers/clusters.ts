/**
 * Create New Household
 * @param req
 * @param res
 */
import { ValidatedRequest } from 'express-joi-validation'
import { ClusterBodySchema } from '../schema/cluster'
import { Response, User } from '../util/types'
import dataService from '../services/dataService'
import { CLUSTERS } from '../constants/collection'
import { constructData } from '../util/helper'
import { ADMIN, SUPER_ADMIN } from '../constants/roles'

const clusterService = dataService(CLUSTERS)

/**
 * Create new cluster
 * @param req
 * @param res
 */
export const createClusterHandler = async (
  req: ValidatedRequest<ClusterBodySchema>,
  res: Response
) => {
  // only SuperAdmin can create new cluster
  const user = (req as any).user as User
  const isAllowed = user.role === SUPER_ADMIN
  if (!isAllowed)
    return res
      .status(401)
      .json({ message: `Sorry, your request could not be processed` })
  const newCluster = constructData(req)
  try {
    await clusterService.createData(newCluster)
    res.json({ message: `Cluster successfully created!` })
  } catch (e) {
    res.status(400).json(e)
  }
}

/**
 * Update existing household
 * @param req
 * @param res
 */
export const updateClusterHandler = async (
  req: ValidatedRequest<ClusterBodySchema>,
  res: Response
) => {
  // only admin with same cluster can edit
  const user = (req as any).user as User
  const isAllowed = user.role === ADMIN && user.clusterId === req.params.id
  if (!isAllowed)
    return res
      .status(401)
      .json({ message: `Sorry, your request could not be processed` })
  try {
    const data = await clusterService.getDataById(req.params.id)
    if (data) {
      try {
        await clusterService.updateData(req.params.id, req.body)
        res.status(200).json({ message: 'Cluster successfully updated!' })
      } catch (e) {
        res.status(400).json(e)
      }
    } else {
      res.status(400).json({ message: `Cluster doesn't exist` })
    }
  } catch (e) {
    res.status(400).json(e)
  }
}
