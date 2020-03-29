import * as Joi from '@hapi/joi'
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation'

export interface UserBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string
    password: string
    confirmPassword: string
    role: string
    clusterId: string
    firstName: string
    lastName: string
    phoneNumber: string
    address: string
  }
}

export const userBodySchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  role: Joi.string(),
  clusterId: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
})
