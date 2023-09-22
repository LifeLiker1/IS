import React, { useState } from "react";
import "./header.scss";
import { Button } from "antd";
import themeSwitcher from "./themeSwitcher";

function Header() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <header>
      <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <h1>Мое веб-приложение</h1>
      <themeSwitcher isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <button onClick={toggleTheme}>Переключить тему</button>
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
