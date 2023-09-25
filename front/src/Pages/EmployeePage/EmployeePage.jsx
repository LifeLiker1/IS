import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Здесь выполните запрос на сервер для получения данных о сотруднике
    // на основе `employeeId` и установите их в `employee`
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`);
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();
        console.log(data)
        setEmployee(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, [employeeId]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Детали сотрудника: {employee.Surname} {employee.Name}</h1>
      {/* Другие данные о сотруднике */}
    </div>
  );
};

export default EmployeeDetails;
