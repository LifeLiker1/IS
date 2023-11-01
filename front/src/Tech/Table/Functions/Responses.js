
async function fetchData(selectedLocation, setEquipment) {
  document.title = "Страница диспетчера";
  try {
    const response = await fetch("http://localhost:3001/api/equipment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка при получении данных: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Некорректный формат данных");
    }
    setEquipment(data);
  } catch (error) {
    console.error(error);
  }
}

async function onShift(){
  try {
    const responce = await fetch ("http://localhost:3001/api/employees/onShift")
    console.log(responce)
    const data = await responce.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}


export { fetchData, onShift};
