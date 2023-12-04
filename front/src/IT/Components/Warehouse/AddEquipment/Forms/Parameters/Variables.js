const fieldsStyle = { width: "90%" };

const statusSelect = [
  {
    title: "В работе",
    value: true,
  },
  {
    title: "Неисправно",
    value: false,
  },
];


const marketSelect = [
  { title: "ADEM", value: "ADEM" },
  { title: "Ялян", value: "Ялян" },
  { title: "Алатау-1", value: "Алатау-1" },
  { title: "Алатау-2", value: "Алатау-2" },
  { title: "Болашак", value: "Болашак" },
  { title: "Арлан", value: "Арлан" },
  { title: "Казына", value: "Казына" },
  { title: "Нурлы-Тау", value: "Нурлы-Тау" },
];

const equipmentType = [
  { title: "Стойка въезда", value: "Стойка въезда" },
  { title: "Стойка выезда", value: "Стойка выезда" },
  { title: "Платежный терминал", value: "Платежный терминал" },
];

const equipmentOptions = [
  {
    name: "Болт мотора шлагбаума",
    value: "Болт мотора шлагбаума",
    standFor: "Шлагбаум",
    description: "Крепит мотор шлагбаума",
  },
  {
    name: "Пластиковый болт шлагбаума",
    value: "Пластиковый болт шлагбаума",
    standFor: "Шлагбаум",
    description: "Крепит стрелу шлагбаума",
  },
];


export { statusSelect, marketSelect, equipmentType, fieldsStyle, equipmentOptions };
