import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeePage.scss";
import * as EmployeeDetailsFunctions from "./Functions/EmployeeDetailsFunctions";
import EmployeeRedactionForm from "./Functions/EmployeeRedactionForm";
import { CancelButton } from "../New Employee/NewEmployee";
import { Button, Empty } from "antd";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    EmployeeDetailsFunctions.fetchData(employeeId, setEmployee);
  }, [employeeId]);

  const firedEmployee = () => {
    EmployeeDetailsFunctions.fireEmployee(employeeId, history);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = (values) => {
    EmployeeDetailsFunctions.updateEmployeeData(
      employeeId,
      values,
      setIsEditing
    );
    setIsEditing(false);
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="case_body">
      <div className="head">
        <h1>
          Личное дело сотрудника {employee.surname} {employee.name}
        </h1>
      </div>
      <div className="text">
        {isEditing ? (
          <EmployeeRedactionForm
            initialValues={employee}
            onFinish={handleSaveChanges}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div className="left_column">
            <p>Имя - {employee.name}</p>
            <p>Фамилия - {employee.surname} </p>
            <p>
              Дата рождения -{" "}
              {new Date(employee.dateOfBirth).toLocaleDateString("en-GB")}{" "}
            </p>
            <p>Пол - {employee.sex}</p>
            <p>
              Адрес проживания -{" "}
              {`${employee.address.city}, ${employee.address.district}, ${employee.street}`}
            </p>
            <p>Мобильный - {employee.mobilePhone}</p>
            <p>Департамент - {employee.departament} </p>
            <p>Должность - {employee.position} </p>
            <p>
              Изображения -{" "}
              <img
                src={`data:image/jpg;base64,${employee.image}`}
                alt={<Empty />}
              />
            </p>
            <div className="pesonal_inf">
              <div className="about">
                <p>О Себе - {employee.about} </p>
              </div>
              <div className="hobbies">
                <p>Увлечение - {employee.hobbies} </p>
              </div>
            </div>
            <div className="right_column"></div>
          </div>
        )}
      </div>
      {isEditing ? null : (
        <>
          <Button onClick={handleEditButtonClick}>
            Изменить данные сотрудника
          </Button>
          <Button type="primary" danger onClick={firedEmployee}>
            Уволить сотрудника
          </Button>
          <CancelButton />
        </>
      )}
    </div>
  );
};

export default EmployeeDetails;
