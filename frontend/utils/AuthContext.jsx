
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    //  DIRECT token read 
    const token = localStorage.getItem("token");

    const [user, setUser] = useState(
        token ? { token } : null
    );
    const signIn = (userData) => {
        setUser(userData);
    };

    const signOut = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
