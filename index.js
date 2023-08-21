import 'dotenv/config.js'
import express from 'express'

import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()
const port = process.env.PORT

app.use(express.json())

app.get('/api/users', async (req, res) => {
  const results = await PostgresHelper.query('SELECT * FROM users;')

  res.send(JSON.stringify(results))
})

app.listen(port, () => {
  console.log('listening on port ' + port)
})
