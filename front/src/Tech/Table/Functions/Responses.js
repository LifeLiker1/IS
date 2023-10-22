async function fetchData(selectedLocation, setEquipment) {
    document.title = "Страница диспетчера";
    try {
      const response = await fetch("http://localhost:3001/api/equipment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Ошибка при получении данных: ${response.error} `);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Некорректный формат данных");
      }
      setEquipment(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  export { fetchData };