async function getWorkingData() {
  try {
    const response = await fetch("http://localhost:3001/api/warehouse?status=true");
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const equipmentsOnWearhouse = await response.json();
    console.log(equipmentsOnWearhouse);
    return equipmentsOnWearhouse.map((item, index) => ({
      key: index.toString(), // Используйте уникальный ключ для каждого элемента
      name: item.name,
      standFor: item.standFor,
      address: item.address,
      description: item.description,
      count: item.count,
    }));
  } catch (error) {
    console.log(error);
    return []; // Вернуть пустой массив в случае ошибки
  }
}


const columns = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Для чего",
    dataIndex: "standFor",
    key: "standFor",
  },
  {
    title: "Где стоит",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Описание",
    dataIndex: "description",
    key: "descrition",
  },
  {
    title: "Количество",
    dataIndex: "count",
    key: "count",
  },
];



export { columns, getWorkingData};
