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
    label: "Алатау",
  },
  {
    key: "4",
    label: "Болашак",
  },
  {
    key: "5",
    label: "Арлан",
  },
  {
    key: "6",
    label: "Казына",
  },
  {
    key: "7",
    label: "Нурлы-Тау",
  },
];

const locationMap = {
  1: "ADEM",
  2: "Ялян",
  3: "Алатау",
  4: "Болашак",
  5: "Арлан",
  6: "Казына",
  7: "Нурлы-Тау",
};

function ticketRemaining() {
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
