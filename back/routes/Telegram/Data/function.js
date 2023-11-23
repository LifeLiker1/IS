const { uri, dbname, client } = require("./variables");
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.BOT_API, { polling: true });
require("dotenv").config();

async function connectToMongo() {
  await connectToMongo();
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const sessionCollection = client.db(dbname).collection("userSessions");
    await sessionCollection.createIndex({ userId: 1 }, { unique: true });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }finally {
    await client.close();
  }
}

//функция поиска всех сотрудников
async function Employee(chatId, isAuth) {
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
  }finally {
    await client.close();
  }
}

//функция сотрудников на смене
async function onShift(chatId, isAuth) {
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
  }finally {
    await client.close();
  }
}

//функция установки талонов
async function SetTicket(chatId, isAuth) {
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
  }finally {
    await client.close();
  }
}

//Список заявок
async function Application(chatId, isAuth) {
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
  }finally {
    await client.close();
  }
}

//функция разлогинивания пользователя
async function Unauthorized(chatId, authenticatedUserId, keyboardForAll) {
  await connectToMongo();
  try {
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

    const sessionCollection = client.db(dbname).collection("userSessions");
    await sessionCollection.deleteOne({ userId: authenticatedUserId });
    console.log("success");

    isAuth = false;
    authenticatedUserId = null;
    bot.sendMessage(chatId, "Вы успешно разлогинились.", keyboardForAll);
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, "Произошла ошибка при разлогировании.");
  } finally {
    await client.close();
  }
}

async function allMyApplications(){
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
module.exports = {
  Employee,
  SetTicket,
  Application,
  onShift,
  connectToMongo,
  Unauthorized,
  allMyApplications,
  TelegramBot,
  bot,
};
