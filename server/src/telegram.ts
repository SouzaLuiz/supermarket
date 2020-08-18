import TelegramBot from 'node-telegram-bot-api'
import Chat from '@models/Chat'

const token = process.env.TELEGRAM_TOKEN as any

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id
  // console.log(chatId)
  const [exists] = await Chat.find()

  if (exists) {
    await Chat.findByIdAndUpdate(exists._id, { chatId })
  } else {
    await Chat.create({ chatId })
  }

  bot.sendMessage(chatId, 'Cadastrado no sistema!')
})

export default bot
