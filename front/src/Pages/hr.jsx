import React, { useState, useEffect } from "react";
import "./hr.css"

const HR = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Функция для выполнения запроса на сервер
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/employees"); // Замените на реальный URL вашего сервера
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();
        setEmployees(data); // Устанавливаем данные о сотрудниках в состояние
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData(); // Вызываем функцию для выполнения запроса при монтировании компонента
  }, []);

  return (
    <div className="employee_block">
      {employees.map((employee) => (
        <div className="employee_block1" key={employee.id}>
         <p> {employee.adress} {employee.Surname} {employee.Name}</p>
        </div>
      ))}
    </div>
  );
};

export default HR;
