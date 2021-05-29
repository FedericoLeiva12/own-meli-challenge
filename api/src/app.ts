import express from 'express'
import itemsRoute from './routes/items'

const app = express()

app.use('/api/items', itemsRoute)

export default app
