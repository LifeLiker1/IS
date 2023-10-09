import React, { useState, useEffect } from "react";
import "./hr.scss";
import { Card, Form, TreeSelect, notification } from "antd";
import { Link } from "react-router-dom";

const HR = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedDepartament, setSelectedDepartment] = useState(null);
  const [token, setToken] = useState(null);
  const [showAuthNotification, setShowAuthNotification] = useState(false); // Новое состояние для уведомления

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
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setShowAuthNotification(true); // Показать уведомление об отсутствии авторизации
    }
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
        description: `Нет сотрудников в выбранном отделе`,
        duration: 3,
      });
    }
  }, [selectedDepartament, filteredEmployees]);

  // Отображение уведомления об отсутствии авторизации
  useEffect(() => {
    if (showAuthNotification) {
      notification.open({
        message: "Вы не авторизированы",
        duration: 3,
      });
    }
  }, [showAuthNotification]);

  return (
    <div className="employee_block">
      {token ? (
      <><div className="search_field">
          <Form.Item label="Мне нужны сотрудники" className="dep_sel">
            <TreeSelect
              onChange={(value) => setSelectedDepartment(value)}
              treeData={[
                { title: "Все", value: 0 },
                { title: "IT", value: "IT" },
                { title: "Технического отдела", value: "Технический отдел" },
                { title: "Юридического отдела", value: "Юридический" },
              ]} />
          </Form.Item>
        </div>
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
          </div></>
      ) : null /* Убрано отображение уведомления, чтобы избежать дублирования */}
    </div>
  );
};

export default HR;
