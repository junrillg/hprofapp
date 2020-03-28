import * as Joi from '@hapi/joi'
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation'

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    email: string
    password: string
    confirmPassword: string
  }
}

export const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
})
