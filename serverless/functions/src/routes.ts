import app from './util/app'
import { createHouseHoldHandler } from './handlers/households'
import { createUserHandler } from './handlers/users'

app.post('/households', createHouseHoldHandler)

app.post('/users', createUserHandler)

export default app
