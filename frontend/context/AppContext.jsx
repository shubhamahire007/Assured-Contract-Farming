import { useEffect, createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children}) {
    const [isLogin, setLogin] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        setLogin(!!localStorage.getItem('token'));
    }, [])

     const value = {
        isLogin,
        setLogin
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
