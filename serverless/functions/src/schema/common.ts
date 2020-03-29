import * as Joi from '@hapi/joi'
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation'

export interface IdParamsSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string
  }
}

export const IdParamsSchema = Joi.object({
  id: Joi.number().integer().required(),
})
