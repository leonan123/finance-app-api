import 'dotenv/config.js'
import express from 'express'

import { CreateUserController } from './src/controllers/create-user.js'

const app = express()
const port = process.env.PORT

app.use(express.json())

app.post('/api/users', async (req, res) => {
  const createUserController = new CreateUserController()
  const { statusCode, body } = await createUserController.execute(req)

  res.status(statusCode).json(body)
})

app.listen(port, () => {
  console.log('listening on port ' + port)
})
