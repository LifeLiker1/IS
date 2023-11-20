//получение данных обо все оборудовании в офисе
async function fetchDataInOffice() {
  try {
    const response = await fetch(
      "http://localhost:3001/api/equipmentInOffice",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Ошибка при получении данных: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Добавление нового оборудования

async function addNewEquipment() {
  try {
    const response = fetch("http://localhost:3001/api/equipmentOnField", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Ошибка при получении данных: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchDataInOffice, addNewEquipment };
