import './utils/enviroment'
import express, { Application } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

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
  }

  database () {
    mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  }
}

export default new App().server
