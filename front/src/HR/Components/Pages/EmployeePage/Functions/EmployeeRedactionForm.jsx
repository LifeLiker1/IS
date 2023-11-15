// EmployeeForm.jsx

import React from "react";
import { Form, Input, Select, Button } from "antd";
import Calendars from "../../New Employee/calendar";
import { citySet, districtSet, employeeTitle, employeeDepartment } from "../../New Employee/Parameters";

const EmployeeRedactionForm = ({ initialValues, onFinish, onCancel }) => {
  return (
    <Form
      name="editEmployeeForm"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item name="name" label="Имя">
        <Input />
      </Form.Item>
      <Form.Item name="surname" label="Фамилия">
        <Input />
      </Form.Item>
      <Form.Item name="dateOfBirth" label="Дата Рождения">
        <Calendars />
      </Form.Item>
      <Form.Item name="sex" label="Пол">
        <Input />
      </Form.Item>
      <Form.Item name={["address", "city"]} label="Город">
        <Select>
          {citySet.map((city) => (
            <Select.Option key={city.value} value={city.value}>
              {city.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={["address", "district"]} label="Район">
        <Select>
          {Object.keys(districtSet).map((city) => (
            districtSet[city].map((district) => (
              <Select.Option key={district.value} value={district.value}>
                {district.title}
              </Select.Option>
            ))
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="mobilePhone" label="Мобильный">
        <Input />
      </Form.Item>
      <Form.Item name="departament" label="Департамент">
        <Select>
          {employeeDepartment.map((department) => (
            <Select.Option key={department.value} value={department.value}>
              {department.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="position" label="Должность">
        <Select>
          {employeeTitle.map((title) => (
            <Select.Option key={title.value} value={title.value}>
              {title.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="about" label="О себе">
        <Input />
      </Form.Item>
      <Form.Item name="hobbies" label="Хобби">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить изменения
        </Button>
        <Button onClick={onCancel}>Отмена</Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeRedactionForm;
