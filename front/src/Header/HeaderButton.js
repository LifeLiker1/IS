import React, { useEffect, useState } from "react";
import {
  StopTwoTone,
  ProfileTwoTone,
  HomeTwoTone,
  AppstoreTwoTone,
} from "@ant-design/icons";
import { Button, Dropdown } from "antd"; // Удалим Tooltip

const HeaderButton = () => {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };

  function setButtons() {
    if (document.title === "Страница отдела кадров") {
      return[
        {
          icon: <AppstoreTwoTone />,
          key: "1",
          label: <a href="/employee">На главную</a>,
        },
        {
          icon: <HomeTwoTone />,
          key: "2",
          label: <a href="/newEmployee">Добавить сотрудника</a>,
        },
        {
          icon: <StopTwoTone />,
          key: "3",
          onClick: handleLogout,
          danger: true,
          label: <a>Выход</a>,
        },
      ];
    } else if (document.title === "Страница IT-отдела") {
      return[
        {
          icon: <HomeTwoTone />,
          key: "1",
          label: <a href="/it">На главную</a>,
        },
        {
          icon: <AppstoreTwoTone />,
          key: "2",
          label: <a href="/it/warehouse">На склад</a>,
        },
        {
          icon: <StopTwoTone />,
          key: "3",
          onClick: handleLogout,
          danger: true,
          label: <a>Выход</a>,
        },
      ];
    } else if(document.title === "Страница Диспетчера"){
      return[
        {
          icon: <HomeTwoTone />,
          key: "1",
          label: <a href="/tech">На главную</a>,
        },
        {
          icon: <StopTwoTone />,
          key: "2",
          onClick: handleLogout,
          danger: true,
          label: <a>Выход</a>,
        },
      ];
    } else{
      return[
        {
          icon: <HomeTwoTone />,
          key: "1",
          label: <a href="/">На главную</a>,
        },
        {
          icon: <StopTwoTone />,
          key: "2",
          onClick: handleLogout,
          danger: true,
          label: <a>Выход</a>,
        },
      ];
    }
  }
  setButtons()
  const items = setButtons()
  console.log(items)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log(token);
    }
  }, [token]);
  return (
    <div>
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
    </div>
  );
};

export default HeaderButton;
