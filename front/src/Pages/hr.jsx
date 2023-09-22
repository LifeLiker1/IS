import React, { useState, useEffect } from "react";
import "./hr.scss";
import { Card } from "antd";

const HR = () => {
  const [employees, setEmployees] = useState([]);
  const { Meta } = Card;

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
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta
            title={`${employee.Surname} ${employee.Name}`}
          />
        </Card>
      ))}
    </div>
  );
};

export default HR;
