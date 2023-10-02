import React, { useState, useEffect } from "react";
import "./hr.scss";
import { Card, Form, TreeSelect, notification } from "antd";
import { Link } from "react-router-dom";

const HR = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const { Meta } = Card;

  useEffect(() => {
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

  // Функция для фильтрации сотрудников по отделу
  const filteredEmployees = selectedDepartment
    ? employees.filter((employee) => employee.department === selectedDepartment)
    : employees;

  // Отображение уведомления при изменении selectedDepartment
  useEffect(() => {
    if (selectedDepartment) {
      notification.open({
        message: "Внимание",
        description: `Нет сотрудников в ${selectedDepartment} отделе`,
        duration: 3,
      });
    }
  }, [selectedDepartment]);

  return (
    <div className="employee_block">
      <div className="search_field">
        <Form.Item label="Мне нужны сотрудники" className="dep_sel">
          <TreeSelect
            onChange={(value) => setSelectedDepartment(value)}
            treeData={[
              { title: "Все", value: 0 },
              { title: "IT", value: "IT" },
              { title: "Технический отдел", value: "Tech_Department" },
              { title: "Юридический", value: "HR" },
            ]}
          />
        </Form.Item>
      </div>

      {/* Отображение сотрудников выбранного отдела */}
      {filteredEmployees.length !== 0 ? (
        <div>
          <div className="department-employees">
            {filteredEmployees.map((employee) => (
              <Link key={employee._id} to={`/employees/${employee._id}`}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={<img alt="example" src={employee.image} />}
                >
                  <Meta title={`${employee.surname} ${employee.name}`} />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {selectedDepartment ? (
            <p>Нет сотрудников в {selectedDepartment} отделе</p>
          ) : (
            <p>Выберите отдел для отображения сотрудников</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HR;
