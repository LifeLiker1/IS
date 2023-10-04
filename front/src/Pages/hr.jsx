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
            placeholder="Выберите отдел для отображения сотрудников"
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
              <div className="card-employee">
              <Link key={employee._id} to={`/employees/${employee._id}`}>
                <Card
                  hoverable
                  // cover={<img alt={alts} src={alts} />}
                  style={{
                    width: 240,
                    minHeight: 250,
                    backgroundImage: `url("../Images/Man1.jpg)`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="employee_names">
                    <Meta title={`${employee.surname} ${employee.name}`} />
                  </div>
                </Card>
              </Link>
              </div>
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
