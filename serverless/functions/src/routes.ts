import app from './util/app'
import { createHouseHoldHandler } from './handlers/household'

app.post('/households', createHouseHoldHandler)

export default app
