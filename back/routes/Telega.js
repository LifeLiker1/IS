const { Router } = require("express");
const TelegramBot = require("node-telegram-bot-api");
const fetch = require('node-fetch');
require('dotenv').config();

const router = Router();

// Замените 'YOUR_BOT_TOKEN' на фактический токен вашего бота
const bot = new TelegramBot(process.env.BOT_API, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Валера сосиж жопу.');
});

bot.onText(/\/employee/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await fetch('http://localhost:3001/employees'); // Замените URL на ваш серверный эндпоинт
    if (!response.ok) {
      throw new Error('Ошибка при выполнении запроса');
    }

    const employees = await response.json();

    // Теперь у вас есть данные о сотрудниках в переменной "employees".
    // Вы можете отправить их обратно в чат Telegram.
    const message = `Данные о сотрудниках: ${JSON.stringify(employees)}`;
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Произошла ошибка:', error);
    bot.sendMessage(chatId, 'Произошла ошибка при получении данных о сотрудниках.');
  }
});

module.exports = router;
