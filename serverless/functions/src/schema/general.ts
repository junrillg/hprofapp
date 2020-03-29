import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation'
import * as Joi from '@hapi/joi'

export interface LoginBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string
    password: string
  }
}

export const loginBodySchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})
