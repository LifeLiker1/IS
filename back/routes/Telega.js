const { Router } = require("express");
const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
require("dotenv").config();

const { commandsForUser } = require("./telegramFunctions");
const router = Router();
const bot = new TelegramBot(process.env.BOT_API, { polling: true });

const commands = commandsForUser;
let isAuth = false;

bot.setMyCommands(commands);

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
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
      one_time_keyboard: true,
    },
  };
  bot.sendMessage(
    chatId,
    "Здравствуйте. Для авторизации нажмите кнопку 'Авторизация'.",
    options
  );
});

bot.on("contact", (msg) => {
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact.phone_number;
  async function SearchPhone() {
    const response = await fetch("http://localhost:3001/api/employees", {
      method: "GET",
    });
    try {
      const result = await response.json();
      const findEmployee = result.find((employee) => employee.mobilePhone === phoneNumber)
      if(findEmployee){
        const isAuth = true
        bot.sendMessage(chatId, `Здравствйте ${findEmployee.name} ${findEmployee.surname}`);
      }else{
        const isAuth = false
        bot.sendMessage(chatId, `Пользователя с таким номером телефона не найдено`);
      }
      console.log(phoneNumber)
      console.log(findEmployee)
    } catch (error) {
      console.log(error);
    }
  }
  SearchPhone();
  bot.sendMessage(chatId, `Вы ввели номер телефона: ${phoneNumber}`);
  // Здесь можно добавить код для дальнейших действий, связанных с авторизацией.
});


// async function Auth(chatId) {
//   try {
//     const response = await fetch("http://localhost:3001/api/employees");
//     if (response.ok) {
//       console.log("Hello World");
//     }
//     const result = await response.json();
//     const findEmployee = result.findOne({ mobilePhone: "77471082141" });
//   } catch (error) {
//     console.log(error);
//   }
// }

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
  if(!isAuth){try {
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
  try {
    await Application(chatId);
  } catch (error) {
    bot.sendMessage(chatId, "Произошла ошибка при получении данных о заявках.");
    console.error("Произошла ошибка:", error);
  }
});

bot.onText(/\/tickets/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await SetTicket(chatId);
  } catch (error) {
    bot.sendMessage(chatId, "Произошла ошибка при получении данных");
    console.error("Произошла ошибка:", error);
  }
});

bot.onText(/\/auth/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await Auth(chatId);
  } catch (error) {
    bot.sendMessage(chatId, "Произошла ошибка при получении данных");
    console.error("Произошла ошибка:", error);
  }
});

module.exports = router;
