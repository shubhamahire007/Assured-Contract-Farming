import { useEffect, createContext, useState } from "react";

export const AppContext = createContext();

const getInitialUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return {
    id: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
    isVerified: localStorage.getItem("isVerified"),
    token: localStorage.getItem("token"),
  };
};

export default function AppContextProvider({ children }) {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(getInitialUser());
  const [offers, setOffers] = useState([]);

  const isLogin = !!user;
  const role = user ? user.role : "";
  const value = {
    user,
    setUser,
    offers,
    setOffers,
    isLogin,
    isLoading,
    setLoading,
    role,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
