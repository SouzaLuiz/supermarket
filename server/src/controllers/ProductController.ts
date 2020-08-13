import { Response, Request } from 'express'
import Joi from '@hapi/joi'
import Product from '../models/Product'
import { realToCents } from '../utils/convertsMoney'

class ProductController {
  async index (req: Request, res: Response) {
    const limit = req.query.limit as any || 10
    const page = req.query.page as any || 1
    const skip = limit * (page - 1)

    try {
      const products = await Product.find()
        .limit(Number(limit))
        .skip(skip)

      return res.json(products)
    } catch (error) {
      return res.status(400).send()
    }
  }

  async store (req: Request, res: Response) {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      imageUrl: Joi.string().required()
    })

    try {
      await schema.validateAsync(req.body)

      const { name, price, imageUrl } = req.body

      const product = await Product.create({
        name,
        price: realToCents(price),
        imageUrl
      })

      return res.status(201).json(product)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async delete (req: Request, res: Response) {
    const schema = Joi.object({
      id: Joi.required()
    })

    const validation = await schema.validateAsync(req.params)

    if (!validation) {
      return res.status(400).send()
    }

    const { id } = req.params

    try {
      await Product.findByIdAndDelete(id)
      return res.status(204).send()
    } catch (error) {
      return res.status(400).send()
    }
  }
}

export default new ProductController()
