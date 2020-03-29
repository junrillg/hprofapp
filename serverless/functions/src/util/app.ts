import * as express from 'express'
import authorize from '../middleware/authorize'

const app = express()

app.use(authorize({ exclude: ['/login', '/logout'] }))

export default app
