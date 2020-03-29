// Schema
import { userBodySchema } from './schema/users'
import { householdBodySchema, householdQuerySchema } from './schema/households'
import { IdParamsSchema } from './schema/common'
import { loginBodySchema } from './schema/general'

// Handlers
import { loginHandler, logoutHandler, sessionHandler } from './handlers/general'
import { createUserHandler } from './handlers/users'

import {
  createHouseHoldHandler,
  deleteHouseholdHandler,
  getAllHouseholdByCluster,
  getHouseholdByIdHandler,
  updateHouseholdHandler,
} from './handlers/households'

// Util
import app from './util/app'
import validator from './util/validator'
import { CLUSTERS, HOUSEHOLDS } from './constants/collection'
import { clusterBodySchema } from './schema/cluster'
import { createClusterHandler, updateClusterHandler } from './handlers/clusters'

//===========================================================
// General
//===========================================================
app.post(`/login`, validator.body(loginBodySchema), loginHandler)
app.post(`/logout`, validator.body(loginBodySchema), logoutHandler)

app.get(`/session`, sessionHandler)

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

//===========================================================
// Cluster
//===========================================================
app.post(
  `/${CLUSTERS}`,
  validator.body(clusterBodySchema),
  createClusterHandler
)

app.put(
  `/${HOUSEHOLDS}/:id`,
  validator.params(IdParamsSchema),
  validator.body(clusterBodySchema),
  updateClusterHandler
)

export default app
