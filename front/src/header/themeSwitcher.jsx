import React from 'react'
import "../App.css"

function themeSwitcher({ isDarkTheme, toggleTheme }) {
    return (
      <button onClick={toggleTheme}>
        Переключить тему {isDarkTheme ? "светлую" : "темную"}
      </button>
    );
  }

export default themeSwitcher