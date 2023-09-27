import React, { useState, useEffect } from "react";
import "./hr.scss";
import { Card } from "antd";
import { Link } from "react-router-dom"; // Импортируйте Link из React Router

const HR = () => {
  const [employees, setEmployees] = useState([]);
  const { Meta } = Card;

  useEffect(() => {
    // Функция для выполнения запроса на сервер
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/employees");
        
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
  

    fetchData();
  }, []);

  return (
    <div className="employee_block">
      {employees.map((employee) => (
        // Используйте компонент Link для создания ссылок на страницу деталей сотрудника
        <Link key={employee._id} to={`/employees/${employee._id}`}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src={employee.image}
              />
            }
          >
            <Meta
              title={`${employee.surname} ${employee.name}`}
            />
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default HR;
