import React from "react";
import "./AppFooter.scss";
import { Layout } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="footer">
      <div className="contacts">
        Контактная информация
        <div className="numbers">
          87471082141
          <br />
          <PhoneOutlined /> или <WhatsAppOutlined />
          <br />
          <MailOutlined /> ivanych_54@mail.ru
          <br />
        </div>
      </div>
      <div className="text">
        <p>Ant Design ©2023 Created by Ivan Nassonov and RR2 company</p>
      </div>
    </Footer>
  );
};

export default AppFooter;
