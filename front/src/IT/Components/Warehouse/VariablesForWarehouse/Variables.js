const columns = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Где стоит",
    dataIndex: "standFor",
    key: "standFor",
  },
  {
    title: "Описание",
    dataIndex: "description",
    key: "descrition",
  },
  {
    title: "Количество на складе",
    dataIndex: "count",
    key: "count",
  },
];

async function getWorkingData() {
  try {
    const response = await fetch(
      "http://localhost:3001/api/warehouse?status=true"
    );
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const equipmentsOnWearhouse = await response.json();
    console.log(equipmentsOnWearhouse);
    return equipmentsOnWearhouse.map((item, index) => ({
      key: index.toString(), // Используйте уникальный ключ для каждого элемент
      id: item._id,
      name: item.name,
      standFor: item.standFor,
      description: item.description,
      status: item.status,
    }));
  } catch (error) {
    console.log(error);
    return []; // Вернуть пустой массив в случае ошибки
  }
}

async function getFaultyData() {
  try {
    const response = await fetch(
      "http://localhost:3001/api/warehouse?status=false"
    );
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
    }));
  } catch (error) {
    console.log(error);
    return []; // Вернуть пустой массив в случае ошибки
  }
}


// Добавьте другие варианты оборудования]

export { columns, getWorkingData, getFaultyData };
