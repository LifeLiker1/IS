import React, { useEffect, useState } from "react";
import {
  StopTwoTone,
  PlusCircleOutlined,
  HomeTwoTone,
  AppstoreTwoTone,
} from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useLocation } from "react-router-dom";

const HeaderButton = () => {
  const [token, setToken] = useState(null);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };

  const setButtons = () => {
    const commonButtons = [];

    if (location.pathname === "/employees") {
      return [
        {
          icon: <AppstoreTwoTone />,
          key: "2",
          label: <a href="/employee">На главную</a>,
        },
        {
          icon: <HomeTwoTone />,
          key: "3",
          label: <a href="/newEmployee">Добавить сотрудника</a>,
        },
        {
          icon: <StopTwoTone />,
          key: "5",
          onClick: handleLogout,
          danger: true,
          label: <a>Выход</a>,
        },
        ...commonButtons,
      ];
    } else if (location.pathname === "/it") {
      return [
        {
          icon: <HomeTwoTone />,
          key: "2",
          label: <a href="/it">На главную</a>,
        },
        {
          icon: <AppstoreTwoTone />,
          key: "3",
          label: <a href="/it/warehouse">На склад</a>,
        },
        {
          icon: <PlusCircleOutlined />,
          key: "4",
          label: <a href="/it/addEquipment">Добавить оборудование</a>,
        },
        {
          icon: <StopTwoTone />,
          key: "5",
          onClick: handleLogout,
          danger: true,
          label: <a>Выход</a>,
        },
        ...commonButtons,
      ];
    } else if (
      location.pathname === "/it/warehouse" ||
      location.pathname === "/it/equipmentOnField"
    ) {
      return [
        {
          icon: <HomeTwoTone />,
          key: "2",
          label: <a href="/it">На главную</a>,
        },
        {
          icon: <PlusCircleOutlined />,
          key: "4",
          label: <a href="/it/addEquipment">Добавить оборудование</a>,
        },
        {
          icon: <StopTwoTone />,
          key: "5",
          onClick: handleLogout,
          danger: true,
          label: <a>Выход</a>,
        },
        ...commonButtons,
      ];
    } else if (location.pathname === "/it/addEquipment") {
      return [
        {
          icon: <HomeTwoTone />,
          key: "2",
          label: <a href="/it">На главную</a>,
        },
        {
          icon: <HomeTwoTone />,
          key: "3",
          label: <a href="/it/equipmentOnField">К списку оборудования</a>,
        },
        {
          icon: <StopTwoTone />,
          key: "5",
          onClick: handleLogout,
          danger: true,
          label: <a>Выход</a>,
        },
        ...commonButtons,
      ];
    } else if (location.pathname === "/tech") {
      return [
        {
          icon: <HomeTwoTone />,
          key: "2",
          label: <a href="/tech">На главную</a>,
        },
        {
          icon: <StopTwoTone />,
          key: "5",
          onClick: handleLogout,
          danger: true,
          label: <a>Выход</a>,
        },
        ...commonButtons,
      ];
    }

    return commonButtons;
  };

  const items = setButtons();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div>
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <Button>Меню</Button>
      </Dropdown>
    </div>
  );
};

export default HeaderButton;
