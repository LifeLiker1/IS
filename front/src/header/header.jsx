import React from "react";
import "./header.scss";
import { Button, Form, TreeSelect } from "antd";



function Header() {
  return (
    <header>
      <nav>
        <Form.Item label="Мне нужны сотрудники">
          <TreeSelect
          treeData={[
            {
              title: "IT",
              value: "IT",
            },
            {
              title: "Технический отдел",
              value: "Tech_Department",
            },
            {
              title: "Юридический",
              value: "HR",
            },
          ]}
          />
        </Form.Item>
        <Button href="/">На главную</Button>
        <Button href="/newEmployee">Добавить сотрудника</Button>
        <Button href="/login">Выход</Button>
      </nav>
    </header>
  );
}

export default Header;
