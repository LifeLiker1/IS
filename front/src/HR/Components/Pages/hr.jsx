import React, { useState, useEffect } from "react";
import "./hr.scss";
import { Card, Form, TreeSelect, notification, Button, Result } from "antd";
import { Link } from "react-router-dom";
import Header from "../../Components/header/HRheader";
import Man from "../../../Images/avataaars.svg";

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
        console.log(data)
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
        <>
          <div className="search_field">
            <Header />
            <Form.Item label="Мне нужны сотрудники" className="dep_sel">
              <TreeSelect
                onChange={(value) => setSelectedDepartment(value)}
                treeData={[
                  { title: "Все", value: 0 },
                  { title: "IT", value: "IT отдел" },
                  { title: "Технического отдела", value: "Технический отдел" },
                  {
                    title: "Диспетчерского отдела",
                    value: "Диспетчерский отдел",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="employee_card">
            {filteredEmployees && filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <Link key={employee._id} to={`/employees/${employee._id}`}>
                  <Card hoverable cover={<img src={Man} alt="example" />}>
                    <Meta title={`${employee.surname} ${employee.name}`} />
                  </Card>
                </Link>
              ))
            ) : (
              <div>No employees found</div>
            )}
          </div>
        </>
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="У Вас нет прав для просмотра этого контента, необходима авторизация."
          extra={
            <Button type="primary" href="/">
              Войти
            </Button>
          }
        />
      )}
    </div>
  );
};

export default HR;
