import '../../src/utils/enviroment'

import * as mongoMemory from '../db-handler'
// import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../src/app'
import Product from '../../src/models/Product'
const request = supertest(app)

const products = [
  {
    name: 'Arroz',
    price: 2.45,
    imageUrl: 'https://test.com/bla.png'
  },
  {
    name: 'Feijão',
    price: 2.45,
    imageUrl: 'https://test.com/bla.png'
  },
  {
    name: 'Macarrão',
    price: 2.45,
    imageUrl: 'https://test.com/bla.png'
  },
  {
    name: 'Bolacha',
    price: 2.45,
    imageUrl: 'https://test.com/bla.png'
  },
  {
    name: 'Salsicha',
    price: 2.45,
    imageUrl: 'https://test.com/bla.png'
  }
]

beforeAll(async () => {
  /* await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) */
  await mongoMemory.connect()
})

afterAll(async () => {
  // await mongoose.connection.close()
  await mongoMemory.closeDatabase()
})

afterEach(async () => {
  // await mongoose.connection.db.dropDatabase()
  await mongoMemory.clearDatabase()
})

describe('POST@/api/products', () => {
  it('should create one product in database', async () => {
    const { status } = await request
      .post('/api/products')
      .send({
        name: 'Arroz',
        price: 2.45,
        imageUrl: 'https://test.com/bla.png'
      })

    expect(status).toBe(201)
  })

  it('should fail when trying to create a product with invalid fields', async () => {
    const { status } = await request
      .post('/api/products')
      .send({
        nam: 'Arroz',
        price: 'sdadasdasd',
        imageUrl: 'https://test.com/bla.png'
      })

    expect(status).toBe(400)
  })
})

describe('DELETE@/api/products/:id', () => {
  it('should must delete a product from the database', async () => {
    const { body } = await request
      .post('/api/products')
      .send({
        name: 'Arroz',
        price: 2.45,
        imageUrl: 'https://test.com/bla.png'
      })

    const response = await request
      .delete(`/api/products/${body._id}`)

    expect(response.status).toBe(204)
  })

  it('should fail when trying to delete a product with invalid fields', async () => {
    const response = await request
      .delete('/api/products/sdadadsada3233232dsadada')

    expect(response.status).toBe(400)
  })
})

describe('GET@/api/products', () => {
  it('should must list products according to filters', async () => {
    await Product.insertMany(products)

    const { status } = await request
      .get('/api/products')
      .query({
        limit: 2,
        page: 2
      })

    expect(status).toBe(200)
  })
})
