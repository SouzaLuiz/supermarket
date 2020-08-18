import './utils/enviroment'
import './utils/moduleAlias'
import './telegram'
import express, { Application } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes'

class App {
  server: Application

  constructor () {
    this.server = express()
    this.middlewares()
    this.database()
  }

  middlewares () {
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use('/api', routes)
  }

  database () {
    mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
  }
}

export default new App().server
