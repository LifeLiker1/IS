import React, { useState, useEffect } from "react";
import "./header.scss";
import { Button } from "antd";

function Header() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };

  return (
    <header>
      <nav>
        {token ? (
          <>
          <Button href="/employees">На главную</Button>
            <Button href="/newEmployee">Добавить сотрудника</Button>
            <Button onClick={handleLogout}>Выход</Button>
          </>
        ) : (
          <Button href="/">Войти</Button>
        )}
      </nav>
    </header>
  );
}

export default Header;
