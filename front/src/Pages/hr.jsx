import React, { useState, useEffect } from "react";
import "./hr.scss";
import { Card, Form, TreeSelect, notification } from "antd";
import { Link } from "react-router-dom";

const HR = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedDepartament, setSelectedDepartment] = useState(null);
  const { Meta } = Card;

  useEffect(() => {
    const fetchData = async () => {
      document.title = "Страница отдела кадров";
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

  // Функция для фильтрации сотрудников по отделу
  const filteredEmployees = selectedDepartament
    ? employees.filter(
        (employee) => employee.departament === selectedDepartament
      )
    : employees;

  // Отображение уведомления при изменении selectedDepartment
  useEffect(() => {
    if (filteredEmployees.length === 0 && selectedDepartament !== null) {
      notification.open({
        message: "Внимание",
        description: `Нет сотрудников в ${selectedDepartament} отделе`,
        duration: 3,
      });
    }
  }, [selectedDepartament, filteredEmployees]);

  return (
    <div className="employee_block">
      <div className="search_field">
        <Form.Item label="Мне нужны сотрудники" className="dep_sel">
          <TreeSelect
            onChange={(value) => setSelectedDepartment(value)}
            treeData={[
              { title: "Все", value: 0 },
              { title: "IT", value: "IT" },
              { title: "Технический отдел", value: "Технический отдел" },
              { title: "Юридический", value: "Юридический" },
            ]}
          />
        </Form.Item>
      </div>

      {/* Отображение сотрудников выбранного отдела */}
      <div className="employee_card">
        <div className="department-employees">
          {filteredEmployees.map((employee) => (
            <Link key={employee._id} to={`/employees/${employee._id}`}>
              <Card
                hoverable
                style={{
                  width: 250,
                }}
                cover={<img src={employee.image} alt="example" />}
              >
                <Meta title={`${employee.surname} ${employee.name}`} />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HR;
