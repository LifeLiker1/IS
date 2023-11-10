const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.BOT_API, { polling: true });
require("dotenv").config();

function checkAuthentication(userId) {
  return userId === authenticatedUserId;
}

//функция поиска всех сотрудников
async function Employee(chatId, isAuth) {
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

//функция сотрудников на смене
async function onShift(chatId, isAuth) {
  try {
    const response = await fetch("http://localhost:3001/api/employees/onShift");
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const employees = await response.json();
    console.log(employees)
    const EmployeesOnShift = employees
      .map((employee, index) => {
        return `Сотрудник ${index + 1}:\nИмя: ${employee.name}:\nФамилия: ${
          employee.surname
        }\nДолжность: ${employee.position}\n`;
      })
      .join("\n");

    const message = `Сотрудники на смене:\n${EmployeesOnShift}`;
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error("Произошла ошибка:", error);
    bot.sendMessage(
      chatId,
      "Произошла ошибка при получении должности сотрудника."
    );
  }
}

//функция установки талонов
async function SetTicket(chatId, isAuth) {
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

//Список заявок
async function Application(chatId, isAuth) {
  try {
    const response = await fetch("http://localhost:3001/api/equipmentOnField");
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

module.exports = {
  Employee,
  SetTicket,
  Application,
  checkAuthentication,
  onShift,
  TelegramBot,
  bot,
};
