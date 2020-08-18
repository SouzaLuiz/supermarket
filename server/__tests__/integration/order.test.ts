import supertest from 'supertest'

import app from '@src/app'
import Product from '@models/Product'
import Chat from '@models/Chat'
import * as mongoMemory from '../databaseHandler'
import productsOrder from '../products'

const request = supertest(app)

beforeAll(async () => {
  await mongoMemory.connect()
})

afterAll(async () => {
  await mongoMemory.closeDatabase()
})

afterEach(async () => {
  await mongoMemory.clearDatabase()
})

describe('this deals with how orders are handled', () => {
  beforeEach(async () => {
    const chatId = process.env.TELEGRAM_CHAT_ID

    await Chat.create({ chatId })
  })

  it('this must place an order and send to the telegram', async () => {
    const products = await Product.insertMany(productsOrder)
    const productsWithQuantity = products.map((product: any) => {
      return {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: Math.floor(Math.random() * 6 + 1)
      }
    })

    const data = {
      clientInfo: {
        name: 'Luiz Henrique',
        addres: 'Rua B, Nº 24',
        telephone: '92992547364',
        complement: ' '
      },
      products: productsWithQuantity
    }

    const response = await request
      .post('/api/order')
      .send(data)

    expect(response.status).toBe(200)
  })
})
