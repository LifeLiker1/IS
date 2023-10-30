// const TelegramBot = require("node-telegram-bot-api");
// const bot = new TelegramBot(process.env.BOT_API, { polling: true });
// require("dotenv").config();
const commandsForUser = [
  { command: "auth", description: "Авторизация" },
  {
    command: "start",
    description: "Запуск бота",
  },
  {
    command: "employee",
    description: "Получить всех сотрудников",
  },
  {
    command: "application",
    description: "Все заявки",
  },
  { command: "tickets", description: "Установил талон" },
];


module.exports = { commandsForUser };
