const {
  uri,
  dbname,
  client,
  keyboardForAll,
  keyboardForTech,
  optionsForBarriers,
  optionsForPOFs,
} = require("./variables");
const fetch = require("node-fetch");

const { authenticatedUserIds } = require("../telegram");
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.BOT_API, { polling: true });
require("dotenv").config();


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

// Функция для получения заявок по рынку
async function getApplicationsByMarket(selectedMarket) {
  try {
    const response = await fetch(`http://localhost:3001/api/applications/byMarket?market=${selectedMarket}`);
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Произошла ошибка при получении заявок.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Произошла ошибка при обработке запроса.");
  }
}
// Функция отправки уведомления в Telegram
async function sendTelegramNotification(chatId, application, sharedData) {
  await connectToMongo();
  console.log(sharedData);
  try {
    const messageText = `Получена новая заявка на рынке ${
      sharedData.selectedMarket
    }:\n${JSON.stringify(application)}`;

    // Отправка сообщения в Telegram
    bot.sendMessage(chatId, messageText);
  } catch (error) {
    console.error("Произошла ошибка при отправке уведомления:", error);
  } finally {
    await client.close();
  }
}

//функция поиска всех сотрудников
async function Employee(chatId) {
  await connectToMongo();
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
  } finally {
    await client.close();
  }
}

//функция сотрудников на смене
async function onShift(chatId) {
  await connectToMongo();
  try {
    const response = await fetch("http://localhost:3001/api/employees/onShift");
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const employees = await response.json();
    console.log(employees);
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
  } finally {
    await client.close();
  }
}

//функция установки талонов
async function SetTicket(chatId) {
  await connectToMongo();
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
  } finally {
    await client.close();
  }
}

//Список заявок
async function Application(chatId) {
  await connectToMongo();
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
  } finally {
    await client.close();
  }
}

//закрыть мои заявки
async function closeApplication(chatId, authenticatedUserIds) {
  try {
    await connectToMongo();

    const userPhoneNumber = authenticatedUserIds[chatId];
    if (!userPhoneNumber) {
      bot.sendMessage(chatId, "Пользователь не авторизован.");
      return;
    }

    const collection = client.db(dbname).collection("userSessions");
    const userSession = await collection.findOne({
      userId: userPhoneNumber,
    });

    const selectedMarket = userSession ? userSession.selectedMarket : null;

    const applications = await getApplicationsByMarket(selectedMarket);
    console.log(applications)

    // Создаем клавиатуру на основе полученных данных
    const keyboard = {
      keyboard: [
        ...applications.map((application) => [
          { text: `${application.type} ${application.equipmentNumber}: ${application.text}` },
        ]),
        // Добавляем кнопку "Назад"
        [{ text: "Назад" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    };

    // Отправляем сообщение с клавиатурой
    bot.sendMessage(chatId, "Выберите заявку для закрытия", {
      reply_markup: keyboard,
    });

    // Добавляем обработчик события onText для выбора заявки после выбора "Закрыть заявку"
    bot.on("message", async (msg) => {
      const userChatId = msg.chat.id;

      if (msg.text === "Назад") {
        bot.sendMessage(userChatId, "Вы вернулись к меню закрытия заявок.");
        return;
      }

      // Разбираем текст, чтобы получить ID выбранной заявки
      const selectedApplicationId = msg.text.replace("Заявка ", "").split(":")[0].trim();

      // Теперь у вас есть ID выбранной заявки (selectedApplicationId), который вы можете использовать в запросе для закрытия
      // Продолжите логику для закрытия выбранной заявки

      bot.sendMessage(userChatId, `Выбрана заявка с ID ${selectedApplicationId} для закрытия.`);
    });
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, "Произошла ошибка при закрытии заявок.");
  } finally {
    await client.close();
  }
}

//Устранил неисправность
async function repairEquipment(chatId, sharedData) {
  await connectToMongo();
  console.log(sharedData);
  try {
    const response = await fetch("http://localhost:3001/api/equipmentOnField");
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const application = await response.json();
    const sessionCollection = client.db(dbname).collection("equipmentonfields");
    const filter = { market: sharedData };
    const filteredDocuments = await sessionCollection.find(filter).toArray();
    console.log(filteredDocuments);

    // Создаем обычную клавиатуру
    const keyboard = {
      keyboard: [
        ...filteredDocuments.map((item) => [
          { text: `${item.market} ${item.type} ${item.equipmentNumber}` },
        ]),
        // Добавляем кнопку "Назад"
        [{ text: "Назад" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    };

    // Отправляем сообщение с клавиатурой
    bot.sendMessage(chatId, "Выберите оборудование", {
      reply_markup: keyboard,
    });

    // Добавляем обработчик события onText для выбора неисправности после выбора оборудования
    bot.on("message", async (msg) => {
      const chatId = msg.chat.id;
      if (msg.text === "Назад") {
        // Выполняем логику для кнопки "Назад"
        // Например, отправляем сообщение обратно к меню выбора оборудования
        bot.sendMessage(chatId, "Вы вернулись к меню выбора оборудования.");
        return;
      }
      const selectedEquipment = filteredDocuments.find((item) =>
        msg.text.includes(`${item.market} ${item.type} ${item.equipmentNumber}`)
      );

      if (selectedEquipment) {
        // Выбранное оборудование
        console.log(selectedEquipment.type);

        // Теперь вы можете использовать selectedEquipment.type в вашей логике

        // Определите тип выбранного оборудования, например, по ID, названию или другому параметру
        const selectedEquipmentType = selectedEquipment.type;

        // Создайте клавиатуру в зависимости от типа оборудования
        let optionsKeyboard;
        if (selectedEquipmentType === "Платежный терминал") {
          optionsKeyboard = optionsForPOFs;
        } else if (
          selectedEquipmentType === "Стойка Въезда" ||
          selectedEquipmentType === "Стойка Выезда"
        ) {
          optionsKeyboard = optionsForBarriers;
        } else {
          // По умолчанию
          optionsKeyboard = [];
        }

        const optionsMarkup = {
          keyboard: optionsKeyboard.map((item) => [{ text: item.label }]),
          resize_keyboard: true,
          one_time_keyboard: false,
        };

        // Отправляем сообщение с клавиатурой вариантов неисправностей
        bot.sendMessage(chatId, "Выберите тип неисправности", {
          reply_markup: optionsMarkup,
        });
      } else {
        // Не найдено соответствие
        console.log("Не найдено соответствие для выбранного оборудования");
      }
    });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

//функция разлогинивания пользователя
async function allMyApplications(chatId, authenticatedUserIds) {
  try {
    await connectToMongo();

    const userPhoneNumber = authenticatedUserIds[chatId];
    if (!userPhoneNumber) {
      bot.sendMessage(chatId, "Пользователь не авторизован.");
      return;
    }
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
}

//разлогиневание
async function Unauthorized(chatId, authenticatedUserIds, keyboardForAll) {
  console.log(authenticatedUserIds);
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
          mobilePhone: authenticatedUserIds[chatId],
        }),
      }
    );
    const result = await response.json();

    const sessionCollection = client.db(dbname).collection("userSessions");
    await sessionCollection.deleteOne({ userId: authenticatedUserIds[chatId] });

    bot.sendMessage(chatId, "Вы успешно разлогинились.", keyboardForAll);
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, "Произошла ошибка при разлогировании.");
  } finally {
    await client.close();
  }
}
module.exports = {
  Employee,
  SetTicket,
  Application,
  onShift,
  connectToMongo,
  Unauthorized,
  allMyApplications,
  repairEquipment,
  sendTelegramNotification,
  closeApplication,
  TelegramBot,
  bot,
};
