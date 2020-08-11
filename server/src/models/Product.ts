import { model, Schema } from 'mongoose'

const Product = new Schema({
  name: String,
  price: Number,
  imageUrl: String
}, {
  timestamps: true
})

export default model('Products', Product)
