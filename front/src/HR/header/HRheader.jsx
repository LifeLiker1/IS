import React, { useState, useEffect } from "react";
import "./header.scss";
import { Button } from "antd";
import logo from "../../Images/logo_transparent.png"

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
    <>{token ? (<header>
      <div>
        <img src={logo} alt="logo"></img>
      </div>
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
    </header>): (null)}</>
    
  );
}

export default Header;
