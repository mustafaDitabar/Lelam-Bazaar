import React, { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext'


const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className=""
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
