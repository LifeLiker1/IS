import React from "react";
import "./Header.scss";
import logo from "../Images/logo_transparent.png";
import HeaderButton from "./HeaderButton";

function Header() {
  return (
    <>
        <header>
          <div>
            <img src={logo} alt="logo"></img>
          </div>
          <nav>
            <HeaderButton />
          </nav>
        </header>
    </>
  );
}

export default Header;
