
// запрос всех сотрудников
const fetchDataEmployees = async (setEmployees) => {
    document.title = "Страница отдела кадров";
    try {
      const response = await fetch("http://localhost:3001/api/employees");
      if (!response.ok) {
        throw new Error("Ошибка при получении данных");
      }
      const data = await response.json();
      setEmployees(data);
      console.log(data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
    return setEmployees
};


  export {fetchDataEmployees}