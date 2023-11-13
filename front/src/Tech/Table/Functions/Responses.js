async function fetchDataOnField() {
  try {
    const response = await fetch("http://localhost:3001/api/equipmentOnField", {
      method: "GET",
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
    return data; // Вернуть данные из функции
  } catch (error) {
    console.error(error);
    throw error; // Если произошла ошибка, выбросить ее для обработки в родительском компоненте
  }
}

async function fetchDataInOffice() {
  try {
    const response = await fetch("http://localhost:3001/api/equipmentInOffice", {
      method: "GET",
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
    console.error(error);
    throw error; 
  }
}

export { fetchDataInOffice, fetchDataOnField };
