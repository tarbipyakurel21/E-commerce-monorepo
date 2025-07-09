import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser({ username: decoded.sub, role: decoded.role });
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }, []);

  const login = (accessToken, newRefreshToken) => {
    try {
      const decoded = jwtDecode(accessToken);
      setUser({ username: decoded.sub, role: decoded.role });
      setToken(accessToken);
      setRefreshToken(newRefreshToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    } catch (err) {
      console.error("Failed to decode token during login", err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  
  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
