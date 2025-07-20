import { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();



export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// // context/DarkModeContext.js
// import { createContext, useState, useContext } from "react";

// const DarkModeContext = createContext();

// export const DarkModeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => setDarkMode((prev) => !prev);

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// // هوک سفارشی برای استفاده راحت‌تر
// export const useDarkMode = () => useContext(DarkModeContext);
