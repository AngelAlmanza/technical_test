import express from 'express'
import clientsRouter from '../routes/clientsRoutes.js'
import db from '../database/connection.js'
import cors from 'cors'
// import { corsMiddleware } from '../middlewares/corsMiddleware.js'

class Server {
  #app
  #port
  #apiPaths = {
    clients: '/api/clients'
  }

  constructor () {
    this.#app = express()
    this.#port = process.env.PORT || 8000
    this.#dbConnection()
    this.#middlewares()
    this.#routes()
  }

  async #dbConnection () {
    try {
      await db.authenticate()
      console.log('Database connected')
    } catch (error) {
      throw new Error('Database connection error')
    }
  }

  #middlewares () {
    this.#app.use(express.json())
    // this.#app.use(corsMiddleware)
    this.#app.use(cors())
    this.#app.disable('x-powered-by')
  }

  #routes () {
    this.#app.use(this.#apiPaths.clients, clientsRouter)
  }

  listen () {
    this.#app.listen(this.#port, () => {
      console.log(`Server running on port ${this.#port}`)
    })
  }
}

export default Server
