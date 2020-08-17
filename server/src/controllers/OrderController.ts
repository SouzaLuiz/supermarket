import { Request, Response } from 'express'
import bot from '../telegram'
import Chat from '../models/Chat'
import Product from '../models/Product'
import formatMessage from '../utils/formatMessage'

class OrderController {
  async store (req:Request, res:Response) {
    const data = req.body

    const ids = data.products.map((item: any) => {
      return item.id
    })

    try {
      const [chat]: any = await Chat.find()

      const products = await Product.find()
        .where('_id')
        .in(ids)

      const productsWithQuantity = products.map((item: any) => {
        data.products.map((product: any) => {
          if (product.id === String(item._id)) {
            item.quantity = product.quantity
          }
        })

        return {
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }
      })

      data.products = productsWithQuantity

      const message = formatMessage(data)

      bot.sendMessage(chat.chatId, message)

      return res.status(200).send(ids)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}

export default new OrderController()
