const { Router } = require("express");
const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
require("dotenv").config();

const router = Router();

async function Employee(chatId) {
  try {
    const response = await fetch("http://localhost:3001/api/employees");
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const employees = await response.json();

    // Преобразуйте данные о сотрудниках в нужный формат
    const employeeText = employees.map((employee, index) => {
      return `Сотрудник ${index + 1}:\nИмя: ${employee.name}:\nФамилия: ${employee.surname}:\nОтдел:${employee.departament}\nДолжность: ${employee.position}\n`;
    }).join("\n");

    // Теперь у вас есть текст с данными о сотрудниках
    const message = `Данные о сотрудниках:\n${employeeText}`;
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error("Произошла ошибка:", error);
    bot.sendMessage(
      chatId,
      "Произошла ошибка при получении данных о сотрудниках."
    );
  }
}
async function Application(chatId) {
  try {
    const response = await fetch("http://localhost:3001/api/application");
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const application = await response.json();

    // Преобразуйте данные о сотрудниках в нужный формат
    const applicationText = application.map((application, index) => {
      return `Заявка ${index + 1}:\nМодель: ${application.model}:\nТип Оборудования ${application.type}:\nАдресс ${application.adress}\nНеисправность ${application. text}\n`;
    }).join("\n");

    // Теперь у вас есть текст с данными о сотрудниках
    const message = `Данные о заявках:\n${applicationText}`;
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error("Произошла ошибка:", error);
    bot.sendMessage(
      chatId,
      "Произошла ошибка при получении данных о сотрудниках."
    );
  }
}

// Замените 'YOUR_BOT_TOKEN' на фактический токен вашего бота
const bot = new TelegramBot(process.env.BOT_API, { polling: true });

const commands = [
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
];

bot.setMyCommands(commands);

// Обработчик команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Здравствуйте.");
});

bot.onText(/\/employee/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await Employee(chatId); 
  } catch (error) {
    bot.sendMessage(chatId, "Произошла ошибка при получении данных о сотрудниках.");
    console.error("Произошла ошибка:", error);
  }
});
bot.onText(/\/application/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await Application(chatId); 
  } catch (error) {
    bot.sendMessage(chatId, "Произошла ошибка при получении данных о заявках.");
    console.error("Произошла ошибка:", error);
  }
});

module.exports = router;
