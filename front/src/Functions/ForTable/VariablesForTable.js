const items = [
  {
    key: "1",
    label: "ADEM",
  },
  {
    key: "2",
    label: "Ялян",
  },
  {
    key: "3",
    label: "Алатау-1",
  },
  {
    key: "4",
    label: "Алатау-2",
  },
  {
    key: "5",
    label: "Болашак",
  },
  {
    key: "6",
    label: "Арлан",
  },
  {
    key: "7",
    label: "Казына",
  },
  {
    key: "8",
    label: "Нурлы-Тау",
  },
];

const locationMap = {
  1: "ADEM",
  2: "Ялян",
  3: "Алатау-1",
  4: "Алатау-2",
  5: "Болашак",
  6: "Арлан",
  7: "Казына",
  8: "Нурлы-Тау",
};

function ticketRemaining() {
  // eslint-disable-next-line no-unused-vars
  const remaining = 10000;
}

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

export {
  items,
  locationMap,
  optionsForBarriers,
  optionsForPOFs,
  ticketRemaining,
};
