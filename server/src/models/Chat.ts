import { Schema, model } from 'mongoose'

const Chat = new Schema({
  chatId: {
    type: Number,
    required: true
  }
})

export default model('chat', Chat)
