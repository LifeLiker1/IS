import React from "react";
import "./header.css";
import {Link} from "react-router-dom"

function Header() {
  return (
    <nav>
      <div className="nav-wrapper teal">
        <a href="#!" className="brand-logo">
          Заголовок
        </a>
        <ul className="right">
          <li>
            <a href="#!">Главная</a>
          </li>
          <li>
            <a href="#!">Профиль</a>
          </li>
          <li>
            <Link to="/newEmployee">
              <button>Добавить сотрудника</button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button>На главную</button>
            </Link>
          </li>
          <li>
            <a href="#!">Выход</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
