import { Response, Request } from 'express'
import Joi from '@hapi/joi'
import mongoose from 'mongoose'
import Product from '@models/Product'
import realToCents from '@utils/convertsMoney'

class ProductController {
  async index (req: Request, res: Response) {
    const limit = req.query.limit as any || 10
    const page = req.query.page as any || 1
    const name = req.query.name as string
    const skip = limit * (page - 1)

    try {
      let total: number

      if (!name) total = await Product.countDocuments()
      else total = await Product.countDocuments({ name })

      const products = await Product.find(!name ? {} : { name })
        .select('_id name price imageUrl')
        .limit(Number(limit))
        .skip(skip)

      return res.json({ total, products })
    } catch (error) {
      return res.status(400).send()
    }
  }

  async show (req: Request, res: Response) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid object id' })
    }

    const product = await Product.findOne({ _id: id })
      .select('_id name price imageUrl')

    if (!product) {
      return res.status(400).json({ error: 'Product not found!' })
    }

    return res.json(product)
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

  async update (req: Request, res: Response) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid object id' })
    }

    const schema = Joi.object({
      name: Joi.string(),
      price: Joi.number(),
      imageUrl: Joi.string()
    })

    try {
      await schema.validateAsync(req.body)

      if (req.body.price) {
        const { price } = req.body
        req.body.price = realToCents(price)
      }

      const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body)

      return res.status(204).json(product)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async delete (req: Request, res: Response) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid object id' })
    }

    const product = await Product.findOne({ _id: id })

    if (!product) {
      return res.status(400).json({ error: 'Product not found!' })
    }

    await product.deleteOne()
    return res.status(204).send()
  }
}

export default new ProductController()
