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
  start,
};
