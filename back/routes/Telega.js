const { Router } = require("express");
const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
require("dotenv").config();

const { commandsForUser } = require("./telegramFunctions");
const router = Router();
const bot = new TelegramBot(process.env.BOT_API, { polling: true });

const commands = commandsForUser;
let isAuth = false;
let authenticatedUserId = null;



function checkAuthentication(userId) {
  return userId === authenticatedUserId;
}

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  
  if (!isAuth) {
    const options = {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Авторизация",
              request_contact: true,
            },
          ],
        ],
        resize_keyboard: true,
      },
    };
    bot.sendMessage(
      chatId,
      "Здравствуйте. Для авторизации нажмите кнопку 'Авторизация'.",
      options
      );
    } else {
      const commandsForAuthorized = commands;
      bot.setMyCommands(commandsForAuthorized);
      checkAuthentication()
      bot.sendMessage(chatId, "Добро пожаловать! Вы авторизованы.");
    }
  });

  if(isAuth){bot.setMyCommands(commands);}

bot.on("contact", async (msg) => {
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact.phone_number;
  try {
    const response = await fetch("http://localhost:3001/api/employees", {
      method: "GET",
    });
    const result = await response.json();
    const findEmployee = result.find((employee) => employee.mobilePhone === phoneNumber);

    if (findEmployee) {
      isAuth = true;
      bot.sendMessage(chatId, `Здравствуйте ${findEmployee.name} ${findEmployee.surname}`);
    } else {
      isAuth = false;
      bot.sendMessage(chatId, `Пользователя с таким номером телефона не найдено`);
    }

    console.log(phoneNumber);
    console.log(findEmployee);
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, "Произошла ошибка при попытке авторизации.");
  }
});

async function Employee(chatId) {
  try {
    const response = await fetch("http://localhost:3001/api/employees");
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const employees = await response.json();

    const employeeText = employees
      .map((employee, index) => {
        return `Сотрудник ${index + 1}:\nИмя: ${employee.name}:\nФамилия: ${
          employee.surname
        }\nОтдел:${employee.departament}\nДолжность: ${employee.position}\n`;
      })
      .join("\n");

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

async function SetTicket(chatId) {
  try {
    const response = await fetch("http://localhost:3001/api/tickets/decrease", {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    } else {
      bot.sendMessage(chatId, "Талоны загружены");
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
    bot.sendMessage(chatId, "Произошла ошибка при отправке данных");
  }
}
async function Application(chatId) {
  try {
    const response = await fetch("http://localhost:3001/api/equipment");
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const application = await response.json();

    const applicationText = application
      .map((application, index) => {
        return `Заявка ${index + 1}\nМодель: ${
          application.model
        }\nТип Оборудования ${application.type}\nАдресс ${
          application.adress
        }\nНеисправность ${application.text}\n`;
      })
      .join("\n");

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


bot.onText(/\/employee/, async (msg) => {
  const chatId = msg.chat.id;
  if(isAuth){try {
    await Employee(chatId);
  } catch (error) {
    bot.sendMessage(
      chatId,
      "Произошла ошибка при получении данных о сотрудниках."
    );
    console.error("Произошла ошибка:", error);
  }}else{
    bot.sendMessage(chatId, "Вы не авторизированы")
  }
  
});
bot.onText(/\/application/, async (msg) => {
  const chatId = msg.chat.id;
  if(isAuth){try {
    await Application(chatId);
  } catch (error) {
    bot.sendMessage(chatId, "Произошла ошибка при получении данных о заявках.");
    console.error("Произошла ошибка:", error);
  }}else{
    bot.sendMessage(chatId, "Вы не авторизированы")
  }
});

bot.onText(/\/tickets/, async (msg) => {
  const chatId = msg.chat.id;
  if(isAuth){try {
    await SetTicket(chatId);
  } catch (error) {
    bot.sendMessage(chatId, "Произошла ошибка при получении данных");
    console.error("Произошла ошибка:", error);
  }}else{
    bot.sendMessage(chatId, "Вы не авторизированы")
  }
});

bot.onText(/\/auth/, async (msg) => {
  const chatId = msg.chat.id;
  if(isAuth){try {
    await Auth(chatId);
  } catch (error) {
    bot.sendMessage(chatId, "Произошла ошибка при получении данных");
    console.error("Произошла ошибка:", error);
  }}else{
    bot.sendMessage(chatId, "Вы не авторизированы")
  }
});

bot.onText(/\/logout/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
    authenticatedUserId = null; // Разлогиниваем пользователя
    isAuth = false;
    bot.sendMessage(chatId, "Вы успешно разлогинились.");
});

module.exports = router;
