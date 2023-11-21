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

module.exports = {
  keyboardForDisp,
  keyboardForManagement,
  keyboardForAll,
  keyboardForTech,
  keyboardForMarket,
  start,
};
