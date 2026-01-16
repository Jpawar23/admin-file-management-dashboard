// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // In a real app, this would check localStorage/cookies

    const signIn = (userData) => {
        setUser(userData);
        // You would typically store a token in localStorage or an HttpOnly cookie here
    };

    const signOut = () => {
        setUser(null);
        // You would typically remove the token here
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
