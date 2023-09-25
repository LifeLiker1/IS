import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EmployeePage.scss"
import {CancelButton} from "../New Employee/NewEmployee"
import {Button} from "antd"

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);

  function firedEmployee(){
    
  }

  useEffect(() => {
    // Здесь выполните запрос на сервер для получения данных о сотруднике
    // на основе `employeeId` и установите их в `employee`
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`);
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
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
