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
      console.log(error)
    }
  }

  export {fetchDataOnField}