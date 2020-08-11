import { Router } from 'express'
import ProductController from './controllers/ProductController'
const routes = Router()

routes.get('/products', ProductController.index)
routes.post('/products', ProductController.store)
routes.delete('/products/:id', ProductController.delete)

export default routes
