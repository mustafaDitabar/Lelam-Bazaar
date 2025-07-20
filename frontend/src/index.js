
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";
//ismat
import ShopContextProvider from './context/ShopContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { DarkModeProvider } from "./context/DarkModeContext.js";




const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
   <DarkModeProvider>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <ShopContextProvider >
            <FavoritesProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
             </FavoritesProvider>
           </ShopContextProvider >
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </DarkModeProvider>

  </React.StrictMode>
);


