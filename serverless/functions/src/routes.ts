import app from './util/app'
import {
  createHouseHoldHandler,
  deleteHouseholdHandler,
  getAllHouseholdByCluster,
  getHouseholdByIdHandler,
  updateHouseholdHandler,
} from './handlers/households'
import { createUserHandler } from './handlers/users'
import validator from './util/validator'
import { userBodySchema } from './schema/users'
import { householdBodySchema, householdQuerySchema } from './schema/households'
import { IdParamsSchema } from './schema/common'
import { HOUSEHOLDS } from './constants/collection'

//===========================================================
// Household
//===========================================================
app.post(
  `/${HOUSEHOLDS}`,
  validator.body(householdBodySchema),
  createHouseHoldHandler
)

app.get(
  `/${HOUSEHOLDS}`,
  validator.query(householdQuerySchema),
  getAllHouseholdByCluster
)

app.get(
  `/${HOUSEHOLDS}/:id`,
  validator.params(IdParamsSchema),
  getHouseholdByIdHandler
)

app.put(
  `/${HOUSEHOLDS}/:id`,
  validator.params(IdParamsSchema),
  validator.body(householdBodySchema),
  updateHouseholdHandler
)

app.delete(
  `/${HOUSEHOLDS}/:id`,
  validator.params(IdParamsSchema),
  deleteHouseholdHandler
)

//===========================================================
// Users
//===========================================================
app.post('/users', validator.body(userBodySchema), createUserHandler)

export default app
