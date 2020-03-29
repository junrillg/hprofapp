import * as Joi from '@hapi/joi'
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation'

export type ClusterZone = {
  label: string
  key: string
}

export interface ClusterBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    clusterName: string
    clusterData: any
    clusterZone: ClusterZone[]
  }
  [ContainerTypes.Params]: {
    id: string
  }
}

export const clusterBodySchema = Joi.object({
  clusterName: Joi.string().required(),
  clusterData: Joi.any(),
  clusterZone: Joi.array().items(
    Joi.object({
      label: Joi.string(),
      key: Joi.string(),
    })
  ),
})
