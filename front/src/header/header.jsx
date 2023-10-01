import React from "react";
import "./header.scss";
import { Button } from "antd";

function Header() {


  return (
    <header>
      <nav>
        <Button href="/">На главную</Button>
        <Button href="/newEmployee">Добавить сотрудника</Button>
        <Button href="/login">Выход</Button>
      </nav>
    </header>
  );
}

export default Header;
