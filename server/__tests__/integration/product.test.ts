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

  it('should create one product in database', async done => {
    const response = await request
      .post('/products')
      .send({
        name: 'Arroz',
        price: 2.45,
        image_url: 'https://test.com/bla.png'
      })
    expect(response.status).toBe(201)
    done()
  })
})
