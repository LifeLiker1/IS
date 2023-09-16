import React, { useState } from "react";
import { AddEmployee } from "../../Functions/addEmployee";
import "./NewEmployee.css";

function MyComponent() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    sex: "",
    adress: "",
    mobilePhone: "",
    departament: "",
  });

  const handleSubmit = async () => {
    const { name, surname, sex, adress, mobilePhone, departament } = formData;
    await AddEmployee(name, surname, sex, adress, mobilePhone, departament);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="main_form">
      <div className="head">
        <h2>Добавление сотрудника</h2>
      </div>
      <div className="left_column">
        <div className="field_inp">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Имя"
          />
        </div>
        <div className="field_inp">
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Фамилия"
          />
        </div>
        <div className="field_inp">
          <input
            type="text"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            placeholder="Пол"
          />
        </div>
        <div className="field_inp">
          <input
            type="text"
            name="adress"
            value={formData.adress}
            onChange={handleChange}
            placeholder="Адрес"
          />
        </div>
        <div className="field_inp">
          <input
            type="text"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleChange}
            placeholder="Телефон"
          />
        </div>
        <div className="field_inp">
          <input
            type="text"
            name="departament"
            value={formData.departament}
            onChange={handleChange}
            placeholder="Департамент"
          />
        </div>
      </div>
      <div className="right_column">
        <img src="#" alt="img" />
      </div>

      <button type="button" onClick={handleSubmit}>
        Добавить сотрудника
      </button>
    </div>
  );
}

export default MyComponent;
