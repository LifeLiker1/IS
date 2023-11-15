import React from "react";
import { Form, Input } from "antd";
import InputMask from "react-input-mask";
import './Parameters/Forms.scss'

const InOffice = () => {
  return (
    <>
      <div className="main-form">
        <Form.Item name="manufacturer" label="Производитель">
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Тип">
          <Input />
        </Form.Item>
        <Form.Item name="model" label="Модель">
          <Input />
        </Form.Item>
        <Form.Item name="adress" label="Расположение">
          <Input />
        </Form.Item>
        <Form.Item name="MACadress" label="MAC-Адрес">
          <InputMask mask="99.99.99.99.99" maskChar="*" />
        </Form.Item>
        <Form.Item name="IPadress" label="IP-Адрес">
          <Input />
        </Form.Item>
        <Form.Item name="tag" label="Тэг">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Статус"></Form.Item>
        <Form.Item name="text" label="Описание">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="additionalFieldForOffice" label="Дополнительно">
          <Input />
        </Form.Item>
      </div>
    </>
  );
};

export default InOffice;
