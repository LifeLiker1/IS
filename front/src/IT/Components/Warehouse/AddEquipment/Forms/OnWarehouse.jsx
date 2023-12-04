import React, { useState } from "react";
import { Form, Input, Checkbox } from "antd";

import "./Parameters/Forms.scss";

const OnWarehouse = () => {
  const [componentEnabled, setComponentEnabled] = useState(false);

  return (
    <>
      <div className="main-form">
        <Form.Item name="name" label="Название">
          <Input />
        </Form.Item>
        <Form.Item name="standFor" label="Для чего служит">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Статус"></Form.Item>
        <Form.Item name="description" label="Описание">
          <Input.TextArea />
        </Form.Item>
        <Checkbox
          checked={componentEnabled}
          onChange={(e) => setComponentEnabled(e.target.checked)}
        >
          Дополнительно
        </Checkbox>
        <Form disabled={!componentEnabled}>
          <Form.Item name="MACadress" label="MAC-Адрес">
            <Input mask="99.99.99.99.99" maskChar="*" />
          </Form.Item>
          <Form.Item name="IPadress" label="IP-Адрес">
            <Input />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default OnWarehouse;
