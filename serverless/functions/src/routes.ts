import app from './util/app'
import { createHouseHoldHandler } from './handlers/households'
import { createUserHandler } from './handlers/users'
import validator from './util/validator'
import { userSchema } from './schema/users'
import { householdSchema } from './schema/household'

app.post(
  '/households',
  validator.query(householdSchema),
  createHouseHoldHandler
)

app.post('/users', validator.query(userSchema), createUserHandler)

export default app
