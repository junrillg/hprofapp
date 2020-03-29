import * as Joi from '@hapi/joi'
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation'

type Person = {
  firstName: string
  lastName: string
  phoneNumber: string
  isPrimary: boolean
}

export interface HouseholdRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    familyName: string
    clusterId: string
    address: string
    clusterZoneId: string
    clusterData: any
    persons: Person[]
  }
  [ContainerTypes.Params]: {
    id: string
  }
}

export const householdBodySchema = Joi.object({
  familyName: Joi.string().required(),
  clusterId: Joi.string().required(),
  address: Joi.string().required(),
  clusterZoneId: Joi.string().required(),
  clusterData: Joi.any(),
  persons: Joi.array()
    .items(
      Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string(),
        isPrimary: Joi.bool(),
      })
    )
    .required(),
})

export interface HouseholdQuerySchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    clusterId: number
  }
}

export const householdQuerySchema = Joi.object({
  clusterId: Joi.number().required(),
})
