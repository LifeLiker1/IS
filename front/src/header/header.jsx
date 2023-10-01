import React from "react";
import "./header.scss";
import { Button, Form, TreeSelect } from "antd";

function Header() {


  return (
    <header>
      <div className="search_field">
        <Form.Item label="Мне нужны сотрудники" className="dep_sel">
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
      </div>

      <nav>
        <Button href="/">На главную</Button>
        <Button href="/newEmployee">Добавить сотрудника</Button>
        <Button href="/login">Выход</Button>
      </nav>
    </header>
  );
}

export default Header;
