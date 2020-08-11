import { Router } from 'express'
import ProductController from './controllers/ProductController'
const routes = Router()

routes.post('/products', ProductController.store)

export default routes
