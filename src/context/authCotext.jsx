import { createContext, useState } from "react";

export const authContext = createContext();

export const Authprovider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    // we wil wrap authPProvider with app.jsx
    <authContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </authContext.Provider>
  );
};
