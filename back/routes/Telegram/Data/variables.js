require("dotenv").config();
const { MongoClient } = require("mongodb");


const start = {
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

const keyboardForAll = {
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

const keyboardForManagement = {
  reply_markup: {
    keyboard: [
      [
        {
          text: "Все сотруднинки",
        },
        {
          text: "Все заявки",
        },
      ],
      [
        {
          text: "Выход",
        },
      ],
    ],
    resize_keyboard: true,
  },
};

const keyboardForMarket = {
  reply_markup: {
    keyboard: [
      [
        {
          text: "ADEM",
        },
        {
          text: "Ялян",
        },
      ],
      [
        {
          text: "Алатау-1",
        },
        {
          text: "Алатау-2",
        },
      ],
      [
        {
          text: "Болашак",
        },
      ],
      [
        {
          text: "Арлан",
        },
        {
          text: "Казына",
        },
      ],
      [
        {
          text: "Нурлы-Тау",
        },
      ],
    ],
    resize_keyboard: true,
  },
};
const keyboardForTech = {
  reply_markup: {
    keyboard: [
      [
        {
          text: "Закрыть заявку",
        },
        {
          text: "Все мои заявки",
        },
      ],
      [
        {
          text: "Устранил неисправность",
        },
      ],
      [
        {
          text: "Загрузил талоны",
        },
        {
          text: "Выход",
        },
      ],
    ],
    resize_keyboard: true,
  },
};
const keyboardForDisp = {
  reply_markup: {
    keyboard: [
      [
        {
          text: "Техники на смене",
        },
        {
          text: "Все заявки",
        },
      ],
      [
        {
          text: "Загрузить талоны",
        },
        {
          text: "Выход",
        },
      ],
    ],
    resize_keyboard: true,
  },
};

const optionsForBarriers = [
  { value: "Застревание талона", label: "Застревание талона" },
  { value: "Застревание монет", label: "Застревание монет" },
  { value: "Не работает шлагбаум", label: "Не работает шлагбаум" },
  { value: "Не открывает шлабгаум", label: "Не открывает шлабгаум" },
  { value: "Другое", label: "Другое" },
];

const optionsForPOFs = [
  { value: "Застревание талона", label: "Застревание талона" },
  { value: "Замятие купюры", label: "Замятие купюры" },
  { value: "Застревание монет", label: "Застревание монет" },
  { value: "Не работает камера", label: "Не работает камера" },
  { value: "Другое", label: "Другое" },
];

const uri = process.env.uri;
const dbname = process.env.dbName;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const now = new Date();
const midnight = new Date(now);



module.exports = {
  keyboardForDisp,
  keyboardForManagement,
  keyboardForAll,
  keyboardForTech,
  keyboardForMarket,
  optionsForBarriers,
  optionsForPOFs,
  uri,
  dbname,
  client,
  start,
  now,
  midnight,
};
