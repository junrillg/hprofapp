import * as express from 'express'
import * as cors from 'cors'
import authorize from '../middleware/authorize'

const app = express()

app.use(cors())

app.use(authorize({ exclude: ['/login', '/logout'] }))

export default app
