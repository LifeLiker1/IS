const { Router } = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const {
  Employee,
  SetTicket,
  Application,
  checkAuthentication,
  onShift,
  TelegramBot,
  bot,
} = require("./Data/function");
const uri = process.env.uri;
const dbname = process.env.dbName;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const sessionCollection = client.db(dbname).collection("userSessions");
    await sessionCollection.createIndex({ userId: 1 }, { unique: true });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function typeOFkeyboards(result) {
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
    bot1.sendMessage(
      chatId,
      `Здравствуйте ${name} ${surname}. Выберите рынок на котором вы дежурный.`,
      keyboard
    );
  }
}

const {
  keyboardForManagement,
  keyboardForAll,
  keyboardForDisp,
  keyboardForTech,
  keyboardForMarket,
} = require("./Data/variables");
const fetch = require("node-fetch");
require("dotenv").config();

const router = Router();
const bot1 = bot;
const userLastInteraction = {};

let isAuth = false;
let authenticatedUserId = null;

bot1.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.chat.id;
  try {
    await connectToMongo();

    if (!isAuth) {
      let keyboard = keyboardForAll;
      bot1.sendMessage(
        chatId,
        "Здравствуйте. Для авторизации нажмите кнопку 'Авторизация'.",
        keyboard
      );
    } else {
      typeOFkeyboards(result);
    }
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
      bot1.sendMessage(
        chatId,
        `Здравствуйте ${name} ${surname}. Выберите рынок на котором вы дежурный.`,
        keyboard
      );

      // Обработчик текстовых сообщений для выбора рынка
      bot1.once("text", async (msg) => {
        await connectToMongo();
        const selectedText = msg.text;
        const collection = client.db(dbname).collection("userSessions");
        await collection.updateOne(
          { userId: authenticatedUserId },
          { $set: { selectedMarket: selectedText } },
          { upsert: true }
        );

        // Добавьте обработку выбранного рынка
        const selectedMarket = selectedText;

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
          isAuth = true;
          keyboard = keyboardForTech;
          bot1.sendMessage(
            chatId,
            `Вы сегодня дежурный по ${selectedMarket}`,
            keyboard
          );
        } else {
          bot1.sendMessage(chatId, "Не удалось изменить статус onShift.");
        }
      });
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

  if (isAuth) {
    try {
      await connectToMongo();

      const userPhoneNumber = authenticatedUserId;
      const collection = client.db(dbname).collection("userSessions");
      const userSession = await collection.findOne({
        userId: authenticatedUserId,
      });
      const selectedMarket = userSession ? userSession.selectedMarket : null;

      // Отправляет запрос на сервер для получения заявок по рынку
      const response = await fetch(
        `http://localhost:3001/api/applications/byMarket?market=${selectedMarket}`
      );

      if (response.status === 200) {
        const applications = await response.json();

        // Отправляет заявки в чат бота
        bot1.sendMessage(chatId, `Заявки по рынку ${selectedMarket}:`);
        applications.forEach((application) => {
          // Пример: отправка текстового сообщения с информацией о заявке
          bot1.sendMessage(
            chatId,
            `Рынок ${application.market} ${application.type} ${application.text} `
          );
        });
      } else {
        bot1.sendMessage(chatId, "Произошла ошибка при получении заявок.");
      }
    } catch (error) {
      console.error(error);
      bot1.sendMessage(chatId, "Произошла ошибка при обработке запроса.");
    } finally {
      await client.close();
    }
  } else {
    bot1.sendMessage(chatId, "Вы не авторизированы");
  }
});

bot1.onText(/Техники на смене/, async (msg) => {
  const chatId = msg.chat.id;
  if (isAuth) {
    try {
      await connectToMongo();
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
  } else {
    bot1.sendMessage(chatId, "Вы не авторизированы");
  }
});

bot1.onText(/Все сотрудники/, async (msg) => {
  const chatId = msg.chat.id;
  if (isAuth) {
    try {
      await connectToMongo();
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
  } else {
    bot1.sendMessage(chatId, "Вы не авторизированы");
  }
});

bot1.onText(/Все заявки/, async (msg) => {
  const chatId = msg.chat.id;
  if (isAuth) {
    try {
      await connectToMongo();
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
  } else {
    bot1.sendMessage(chatId, "Вы не авторизированы");
  }
});

bot1.onText(/Загрузить талоны/, async (msg) => {
  const chatId = msg.chat.id;
  if (isAuth) {
    try {
      await connectToMongo();
      await SetTicket(chatId, isAuth, bot1);
    } catch (error) {
      bot1.sendMessage(chatId, "Произошла ошибка при получении данных");
      console.error("Произошла ошибка:", error);
    } finally {
      await client.close();
    }
  } else {
    bot1.sendMessage(chatId, "Вы не авторизированы");
  }
});

bot1.onText(/Выход/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await connectToMongo();

    if (isAuth) {
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
      if (response.status === 200) {
        isAuth = false;
        authenticatedUserId = null;
        bot1.sendMessage(chatId, "Вы успешно разлогинились.", keyboardForAll);
      }
    }
  } catch (error) {
    console.log(error);
    bot1.sendMessage(chatId, "Произошла ошибка при разлогировании.");
  } finally {
    await client.close();
  }
});

module.exports = router;
