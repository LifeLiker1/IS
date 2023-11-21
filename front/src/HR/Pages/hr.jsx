import React, { useState, useEffect } from "react";
import "./hr.scss";
import AppFooter from "../../Footer/AppFooter";
import { fetchDataEmployees } from "../../Functions/ForHR/functionsForHR";
import {
  Card,
  Form,
  TreeSelect,
  notification,
  Button,
  Result,
  Empty,
} from "antd";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import Man from "../../Images/avataaars.svg";
import { SearchField } from "../../Functions/ForHR/SearchField";


const HR = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedDepartament, setSelectedDepartment] = useState(null);
  const [token, setToken] = useState(null);
  const [showAuthNotification, setShowAuthNotification] = useState(false); // Новое состояние для уведомления

  const { Meta } = Card;

  useEffect(() => {
    fetchDataEmployees(setEmployees);
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
    <div>
      <Header />
      <div className="employee_block">
        {token ? (
          <>
            <div className="search_field">
              <SearchField setSelectedDepartment={setSelectedDepartment}/>
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
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 160 }}
                  description="В выбранном отделе сотрудников нет"
                  descriptionStyle={{ width: 160 }}
                ></Empty>
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
      <AppFooter />
    </div>
  );
};

export default HR;
