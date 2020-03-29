import * as Joi from '@hapi/joi'
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation'

export interface UserBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string
    password: string
    confirmPassword: string
  }
}

export const userBodySchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
})
