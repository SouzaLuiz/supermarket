import { Router } from 'express'
import ProductController from './controllers/ProductController'
const routes = Router()

routes.get('/products', ProductController.index)
routes.get('/products/:id', ProductController.show)
routes.post('/products', ProductController.store)
routes.put('/products/:id', ProductController.update)
routes.delete('/products/:id', ProductController.delete)

export default routes
