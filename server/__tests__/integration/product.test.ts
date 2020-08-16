import '../../src/utils/enviroment'
import supertest from 'supertest'

import app from '../../src/app'
import Product from '../../src/models/Product'
import * as mongoMemory from '../databaseHandler'
import products from './products'

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

  it('should fail when trying to delete a product with invalid id', async () => {
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
        limit: 10,
        page: 1,
        name: 'Feijão'
      })

    expect(status).toBe(200)
  })
})

describe('GET@/api/products/:id', () => {
  it('should show a product', async () => {
    const product = await Product.create({
      name: 'Arroz',
      price: 3.25,
      imageUrl: 'https://img.com/teste.png'
    })

    const response = await request
      .get(`/api/products/${product._id}`)

    expect(response.status).toBe(200)
  })
})

describe('PUT@/api/products/:id', () => {
  it('should update one product information', async () => {
    const product = {
      price: 4.5
    }

    const { _id: id } = await Product.create({
      name: 'Arroz',
      price: 2.45,
      imageUrl: 'https://test.com/bla.png'
    })

    const { status } = await request
      .put(`/api/products/${id}`)
      .send({
        price: product.price
      })

    expect(status).toBe(204)
  })
})
