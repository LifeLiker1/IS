async function fetchData() {
  document.title = "Страница диспетчера";
  try {
    const response = await fetch("http://localhost:3001/api/equipment", {
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
    console.log(data);
    return data; // Вернуть данные из функции
  } catch (error) {
    console.error(error);
    throw error; // Если произошла ошибка, выбросить ее для обработки в родительском компоненте
  }
}

export { fetchData };
