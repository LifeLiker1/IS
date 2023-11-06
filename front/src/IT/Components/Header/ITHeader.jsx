import React, { useState, useEffect } from "react";
import "./Header.scss";
import {
  StopTwoTone,
  ProfileTwoTone,
  HomeTwoTone,
  AppstoreTwoTone,
} from "@ant-design/icons";
import { Button, Dropdown } from "antd"; // Удалим Tooltip
import logo from "../../../Images/logo_transparent.png";

function Header() {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };
  const items = [
    {
      icon: <AppstoreTwoTone />,
      key: "1",
      label: <a href="/it/stock">На склад</a>,
    },
    {
      icon: <HomeTwoTone />,
      key: "2",
      label: <a href="/it">На главную</a>,
    },
    {
      icon: <ProfileTwoTone />,
      key: "3",
      label: <a href="/it/:employeeId">Профиль</a>,
    },
    {
      icon: <StopTwoTone />,
      key: "4",
      onClick: handleLogout,
      danger: true,
      label: <a>Выход</a>,
    },
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log(token);
    }
  }, [token]);

  return (
    <>
      {token && (
        <header>
          <div>
            <img src={logo} alt="logo"></img>
          </div>
          <nav>
            <>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
                arrow
              >
                <Button>Меню</Button>
              </Dropdown>
            </>
          </nav>
        </header>
      )}
    </>
  );
}

export default Header;
