import '../../src/utils/enviroment'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../../src/app'
const request = supertest(app)

describe('product testing', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase()
  })

  it('should create one product in database', async () => {
    const { status } = await request
      .post('/products')
      .send({
        name: 'Arroz',
        price: 2.45,
        imageUrl: 'https://test.com/bla.png'
      })

    expect(status).toBe(201)
  })

  it('should fail when trying to create a product with invalid fields', async () => {
    const { status } = await request
      .post('/products')
      .send({
        nam: 'Arroz',
        price: 'sdadasdasd',
        imageUrl: 'https://test.com/bla.png'
      })

    expect(status).toBe(400)
  })
})
