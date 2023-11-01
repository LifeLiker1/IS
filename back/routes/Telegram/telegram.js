const { Router } = require("express");
const {
  Employee,
  SetTicket,
  Application,
  checkAuthentication,
  onShift,
  TelegramBot,
  bot,
} = require("./Data/function");
const {
  keyboardForManagement,
  keyboardForAll,
  keyboardForDisp,
} = require("./Data/variables");
const fetch = require("node-fetch");
require("dotenv").config();

const router = Router();
const bot1 = bot;

let isAuth = false;
let authenticatedUserId = null;

bot1.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  if (!isAuth) {
    let keyboard = keyboardForAll;
    bot1.sendMessage(
      chatId,
      "Здравствуйте. Для авторизации нажмите кнопку 'Авторизация'.",
      keyboard
    );
  } else {
    // bot1.setMyCommands(commandsForUser);
    // // checkAuthentication();
    // bot1.sendMessage(chatId, "Добро пожаловать! Вы авторизованы.");
  }
});

bot1.on("contact", async (msg) => {
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact.phone_number;

  try {
    const response = await fetch(
      `http://localhost:3001/api/employees/params?mobilePhone=${phoneNumber}`,
      {
        method: "GET",
      }
    );

    if (response.status === 404) {
      bot1.sendMessage(
        chatId,
        "Пользователя с таким номером телефона не найдено"
      );
      return;
    }

    const result = await response.json();
    const name = result.name || "Unknown";
    const surname = result.surname || "Unknown";

    // В зависимости от должности сотрудника, создайте соответствующее меню
    let keyboard;
    if (
      result.position === "Начальник отдела" ||
      result.position === "Заместитель начальника отдела"
    ) {
      keyboard = keyboardForManagement;
    } else if (
      result.position === "Диспетчер" ||
      result.position === "Техник"
    ) {
      keyboard = keyboardForDisp;
    }

    bot1.sendMessage(chatId, `Здравствуйте ${name} ${surname}`, keyboard);
    isAuth = true;
  } catch (error) {
    console.log(error);
    bot1.sendMessage(chatId, "Произошла ошибка при попытке авторизации.");
  }
});

bot1.onText(/Техники на смене/, async (msg) => {
  const chatId = msg.chat.id;
  if (isAuth) {
    try {
      await onShift(chatId, isAuth, bot1)
    } catch (error) {
      bot1.sendMessage(
        chatId,
        "Произошла ошибка при получении данных о сотрудниках."
      );
      console.error("Произошла ошибка:", error);
    }
  } else {
    bot1.sendMessage(chatId, "Вы не авторизированы");
  }
});

bot1.onText(/Все сотруднинки/, async (msg) => {
  const chatId = msg.chat.id;
  if (isAuth) {
    try {
      await Employee(chatId, isAuth, bot1);
    } catch (error) {
      bot1.sendMessage(
        chatId,
        "Произошла ошибка при получении данных о сотрудниках."
      );
      console.error("Произошла ошибка:", error);
    }
  } else {
    bot1.sendMessage(chatId, "Вы не авторизированы");
  }
});

bot1.onText(/Все заявки/, async (msg) => {
  const chatId = msg.chat.id;
  if (isAuth) {
    try {
      await Application(chatId, isAuth, bot1);
    } catch (error) {
      bot1.sendMessage(
        chatId,
        "Произошла ошибка при получении данных о заявках."
      );
      console.error("Произошла ошибка:", error);
    }
  } else {
    bot1.sendMessage(chatId, "Вы не авторизированы");
  }
});

bot1.onText(/Загрузить талоны/, async (msg) => {
  const chatId = msg.chat.id;
  if (isAuth) {
    try {
      await SetTicket(chatId, isAuth, bot1);
    } catch (error) {
      bot1.sendMessage(chatId, "Произошла ошибка при получении данных");
      console.error("Произошла ошибка:", error);
    }
  } else {
    bot1.sendMessage(chatId, "Вы не авторизированы");
  }
});

bot1.onText(/Выход/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (isAuth) {
      // Отправьте запрос для сброса статуса onShift сотрудника
      await fetch("http://localhost:3001/api/employees/resetOnShift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobilePhone: authenticatedUserId }),
      });
    }

    // Сбросите статус авторизации
    isAuth = false;
    authenticatedUserId = null;

    bot1.sendMessage(chatId, "Вы успешно разлогинились.", keyboardForAll);
  } catch (error) {
    console.log(error);
    bot1.sendMessage(chatId, "Произошла ошибка при разлогировании.");
  }
});

module.exports = router;
