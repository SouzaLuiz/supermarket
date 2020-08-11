import { Response, Request } from 'express'
import Joi from '@hapi/joi'
import Product from '../models/Product'
import { realToCents } from '../utils/convertsMoney'

class ProductController {
  async store (req: Request, res: Response) {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      imageUrl: Joi.string().required()
    })

    try {
      await schema.validateAsync(req.body)

      const { name, price, imageUrl } = req.body

      await Product.create({
        name,
        price: realToCents(price),
        imageUrl
      })

      return res.status(201).send()
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}

export default new ProductController()
