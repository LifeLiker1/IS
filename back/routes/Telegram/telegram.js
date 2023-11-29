const { Router } = require("express");
require("dotenv").config();
const fetch = require("node-fetch");

const router = Router();

const {
  Employee,
  SetTicket,
  Application,
  onShift,
  connectToMongo,
  TelegramBot,
  bot,
} = require("./Data/function");
const bot1 = bot;

const {
  keyboardForManagement,
  keyboardForAll,
  keyboardForDisp,
  keyboardForTech,
  keyboardForMarket,
  dbname,
  client,
  midnight,
  now,
} = require("./Data/variables");

midnight.setHours(24, 0, 0, 0); // Устанавливаем часы, минуты, секунды и миллисекунды для полуночи
const secondsUntilMidnight = Math.floor((midnight - now) / 1000);
console.log(secondsUntilMidnight);

// const userLastInteraction = {};

let isAuth;
let authenticatedUserId;



bot1.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await connectToMongo();
    let keyboard = keyboardForAll;
    bot1.sendMessage(
      chatId,
      "Здравствуйте. Для авторизации нажмите кнопку 'Авторизация'.",
      keyboard
    );
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "Произошла ошибка при подключении к базе данных.");
  } finally {
    await client.close();
  }
});

bot1.on("contact", async (msg) => {
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact.phone_number;
  console.log(phoneNumber);

  try {
    await connectToMongo();

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
    authenticatedUserId = phoneNumber;
    console.log(authenticatedUserId);

    let keyboard;

    if (
      result.position === "Начальник отдела" ||
      result.position === "Заместитель начальника отдела"
    ) {
      keyboard = keyboardForManagement;
      bot1.sendMessage(chatId, `Здравствуйте ${name} ${surname}`, keyboard);
    } else if (result.position === "Диспетчер") {
      keyboard = keyboardForDisp;
      bot1.sendMessage(chatId, `Здравствуйте ${name} ${surname}`, keyboard);
    } else if (result.position === "Техник") {
      keyboard = keyboardForMarket;

      // Проверяем наличие документа о сессии для данного пользователя
      const collection = client.db(dbname).collection("userSessions");
      const existingSession = await collection.findOne({
        userId: authenticatedUserId,
      });

      if (existingSession) {
        // Используем данные из существующего документа
        const selectedMarket = existingSession.selectedMarket;

        // Добавьте обработку выбранного рынка

        bot1.sendMessage(
          chatId,
          `Вы сегодня дежурный по ${selectedMarket}`,
          keyboardForTech
        );
      } else {
        bot1.sendMessage(
          chatId,
          `Здравствуйте ${name} ${surname}. Выберите рынок на котором вы дежурный.`,
          keyboard
        );

        // Обработчик текстовых сообщений для выбора рынка
        bot1.once("text", async (msg) => {
          await client.connect();
          const selectedText = msg.text;
          const selectedMarket = selectedText;

          // Вставляем новый документ о сессии
          await collection.insertOne({
            userId: authenticatedUserId,
            selectedMarket: selectedText,
            expireAt: midnight,
          });

          // Добавьте обработку выбранного рынка

          const secondResponse = await fetch(
            `http://localhost:3001/api/employees/updateOnShift`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mobilePhone: phoneNumber,
                market: selectedMarket,
              }),
            }
          );

          if (secondResponse.status === 200) {
            bot1.sendMessage(
              chatId,
              `Вы сегодня дежурный по ${selectedMarket}`,
              keyboardForTech
            );
          } else {
            bot1.sendMessage(chatId, "Не удалось изменить статус onShift.");
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
    bot1.sendMessage(chatId, "Произошла ошибка при попытке авторизации.");
  } finally {
    await client.close();
  }
});


bot1.onText(/Все мои заявки/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await connectToMongo();

    const userPhoneNumber = authenticatedUserId;
    const collection = client.db(dbname).collection("userSessions");
    const userSession = await collection.findOne({
      userId: userPhoneNumber,
    });
    const selectedMarket = userSession ? userSession.selectedMarket : null;


    // Отправляет запрос на сервер для получения заявок по рынку
  const response = await fetch(
  `http://localhost:3001/api/applications/byMarket?market=${selectedMarket}`
);

    if (response.status === 200) {
      const applications = await response.json();

      // Отправляет заявки в чат бота
      bot.sendMessage(chatId, `Заявки по рынку ${selectedMarket}:`);
      applications.forEach((application) => {
        // Пример: отправка текстового сообщения с информацией о заявке
        bot.sendMessage(
          chatId,
          `Рынок ${application.market} ${application.type} ${application.text} `
        );
      });
    } else {
      bot.sendMessage(chatId, "Произошла ошибка при получении заявок.");
    }
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "Произошла ошибка при обработке запроса.");
  } finally {
    await client.close();
  }
});

bot1.onText(/Техники на смене/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await onShift(chatId, isAuth, bot1);
  } catch (error) {
    bot1.sendMessage(
      chatId,
      "Произошла ошибка при получении данных о сотрудниках."
    );
    console.error("Произошла ошибка:", error);
  } finally {
    await client.close();
  }
});

bot1.onText(/Все сотрудники/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await Employee(chatId, isAuth, bot1);
  } catch (error) {
    bot1.sendMessage(
      chatId,
      "Произошла ошибка при получении данных о сотрудниках."
    );
    console.error("Произошла ошибка:", error);
  } finally {
    await client.close();
  }
});

bot1.onText(/Все заявки/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await Application(chatId, isAuth, bot1);
  } catch (error) {
    bot1.sendMessage(
      chatId,
      "Произошла ошибка при получении данных о заявках."
    );
    console.error("Произошла ошибка:", error);
  } finally {
    await client.close();
  }
});

bot1.onText(/Загрузить талоны/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await SetTicket(chatId, isAuth, bot1);
  } catch (error) {
    bot1.sendMessage(chatId, "Произошла ошибка при получении данных");
    console.error("Произошла ошибка:", error);
  } finally {
    await client.close();
  }
});

bot1.onText(/Выход/, async (msg) => {
  const chatId = msg.chat.id;
  console.log(authenticatedUserId);
  try {
    await connectToMongo();

    const response = await fetch(
      "http://localhost:3001/api/employees/resetOnShift",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobilePhone: authenticatedUserId,
        }),
      }
    );
    const result = await response.json();
    console.log(result);

    const sessionCollection = client.db(dbname).collection("userSessions");
    await sessionCollection.deleteOne({ userId: authenticatedUserId });
    console.log("success");

    bot.sendMessage(chatId, "Вы успешно разлогинились.", keyboardForAll);
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, "Произошла ошибка при разлогировании.");
  } finally {
    await client.close();
  }
});

module.exports = router;
