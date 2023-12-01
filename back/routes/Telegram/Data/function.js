const {
  uri,
  dbname,
  client,
  keyboardForAll,
  keyboardForTech,
} = require("./variables");
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

async function repairEquipment(chatId, sharedData) {
  await connectToMongo();
  console.log(sharedData)
  try {
    const response = await fetch("http://localhost:3001/api/equipmentOnField");
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    const application = await response.json();
    const sessionCollection = client.db(dbname).collection("equipmentonfields");
    const filter = { market: sharedData };
    console.log(filter)
    const filteredDocuments = await sessionCollection.find(filter).toArray();
    bot.sendMessage(chatId, "Список оборудования", keyboardForTech);
  } catch (error) {
    console.log(error);
  } finally{
    await client.close()
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
  TelegramBot,
  bot,
};
