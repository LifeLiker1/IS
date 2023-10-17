import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeePage.scss";
import { CancelButton } from "../New Employee/NewEmployee";
import { Button, notification, Empty } from "antd";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const history = useNavigate();

  async function firedEmployee() {
    try {
      const response = await fetch(
        `http://localhost:3001/api/employees/${employeeId}`,
        {
          method: "DELETE", // Используем метод DELETE для удаления
        }
      );

      if(response.ok){
        notification.open({
          message: "Сотрудник уволен",
          duration: 3,
        });
      }
      else{
        notification.open({
          message: "Ошибка при увольнении сотрудника",
          duration: 3,
        });
      }

      // После успешного удаления, перенаправляем пользователя на другую страницу
      history("/employees"); // Замените "/employees" на URL страницы, куда вы хотите перейти после удаления
    } catch (error) {
      console.error("Ошибка при удалении сотрудника:", error);
    }
  }

  useEffect(() => {
    // Здесь выполните запрос на сервер для получения данных о сотруднике
    // на основе `employeeId` и установите их в `employee`
    const fetchData = async () => {
      try {
        document.title = "Личное дело сотрудника";
        const response = await fetch(
          `http://localhost:3001/api/employees/${employeeId}`
        );
  
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
  
        const data = await response.json(); // Получаем данные в формате JSON
  
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
    <div className="case_body">
      <div className="head">
        <h1>Личное дело сотрудника {employee.surname} {employee.name}</h1>
      </div>
      <div className="text">
        <div className="left_column">
          <p>Имя - {employee.name}</p>
          <p>Фамилия - {employee.surname} </p>
          <p>Пол - {employee.sex}</p>
          <p>Адрес проживания - {`${employee.address.city}, ${employee.address.district}, ${employee.street}`}</p>
          <p>Мобильный - {employee.mobilePhone}</p>
          <p>Департамент - {employee.departament} </p>
          <p>Должность - {employee.position} </p>
          <img
            src={`data:image/jpg;base64,${employee.image}`}
            alt= {<Empty />}
          />

          <div className="pesonal_inf">
            <div className="about">
              <p>О Себе - {employee.about} </p>
            </div>
            <div className="hobbies">
              <p>Увлечение - {employee.hobbies} </p>
            </div>
          </div>
        </div>
        <div className="right_column"></div>
      </div>
      <Button type="primary" danger onClick={firedEmployee}>Уволить сотрудника</Button>
      <CancelButton />
    </div>
  );
};

export default EmployeeDetails;
