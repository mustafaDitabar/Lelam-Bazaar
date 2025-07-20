


import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem("chat-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      console.error("Invalid JSON in localStorage");
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("chat-user", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
