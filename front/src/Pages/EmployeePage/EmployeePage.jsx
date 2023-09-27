import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
=======
import { useParams, useNavigate } from "react-router-dom";
>>>>>>> back
import "./EmployeePage.scss"
import {CancelButton} from "../New Employee/NewEmployee"
import {Button} from "antd"

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
<<<<<<< HEAD

  function firedEmployee(){
    
=======
  const history = useNavigate();

  async function firedEmployee() {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`, {
        method: "DELETE", // Используем метод DELETE для удаления
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении сотрудника");
      }

      // После успешного удаления, перенаправляем пользователя на другую страницу
      history("/"); // Замените "/employees" на URL страницы, куда вы хотите перейти после удаления
    } catch (error) {
      console.error("Ошибка при удалении сотрудника:", error);
    }
>>>>>>> back
  }

  useEffect(() => {
    // Здесь выполните запрос на сервер для получения данных о сотруднике
    // на основе `employeeId` и установите их в `employee`
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`);
<<<<<<< HEAD
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
=======
>>>>>>> back
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
    <div className="case_body">
      <div className="head">
<<<<<<< HEAD
        <h1>Личное дело сотрудника {employee.Surname} {employee.Name}</h1>
      </div>
      <div className="text">
        <div className="left_column">
      <p>Имя - {employee.Name}</p>
      <p>Фамилия - {employee.Surname} </p>
      <p>Пол - {employee.sex}</p>
      <p>Адрес проживания - {employee.adress} </p>
      <p>Мобильный - {employee.mobilePhone}</p>
      <p>Департамент - {employee.departament} </p>
      <p>Должность - {employee.position} </p>
=======
        <h1>Личное дело сотрудника {employee.surname} {employee.name}</h1>
      </div>
      <div className="text">
        <div className="left_column">
      <p>Имя - {employee.name}</p>
      <p>Фамилия - {employee.surname} </p>
      <p>Пол - {employee.sex}</p>
      <p>Адрес проживания - {employee.city} </p>
      <p>Мобильный - {employee.mobilePhone}</p>
      <p>Департамент - {employee.departament} </p>
      <p>Должность - {employee.position} </p>
      <img src={employee.image} alt="SomePicture"></img>
>>>>>>> back
      <div className="pesonal_inf">
        <div className="about"><p>О Себе - {employee.about} </p></div>
        <div className="hobbies"><p>Увличение - {employee.hobbies} </p></div>
      
      </div>
      
      </div>
      <div className="right_column">

      </div>
      </div>
      <Button onClick={firedEmployee}>Уволить сотрудника</Button>
      <CancelButton />
    </div>
  );
};

export default EmployeeDetails;
