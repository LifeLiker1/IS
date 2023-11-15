import React from "react";
import "./AppFooter.scss";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <div className="Footer-div">
      <Footer className="ant-layout-footer">
        Ant Design ©2023 Created by Ivan Nassonov and RR2 company
      </Footer>
    </div>
  );
};

export default AppFooter;
