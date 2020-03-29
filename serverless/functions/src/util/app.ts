import * as express from 'express'
import authorize from '../middleware/authorize'

const app = express()

// @ts-ignore
app.use(
  authorize().unless({
    path: ['/login'],
  })
)

export default app
