import React, { createContext, useContext, useEffect, useState } from "react";
import { decodeToken } from "../utils/JwtUtils";
import { loginUser, logoutUser, refreshToken as refreshTokenAPI } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //set user context from anywhere
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // On mount: load tokens from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedToken && storedRefreshToken) {
      const decodedAccess = decodeToken(storedToken);
      const decodedRefresh = decodeToken(storedRefreshToken);

      if (decodedAccess && decodedRefresh) {
        setUser({
          username: decodedAccess.sub,
          role: decodedAccess.role,
          refreshExp: decodedRefresh.exp,
        });
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }, []);

  // 🔶 Login function calls login API directly and sets context
  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      const accessToken = res.data.accessToken;
      const newRefreshToken = res.data.refreshToken;

      const decodedAccess = decodeToken(accessToken);
      const decodedRefresh = decodeToken(newRefreshToken);

      if (decodedAccess && decodedRefresh) {
        setUser({
          username: decodedAccess.sub,
          role: decodedAccess.role,
          refreshExp: decodedRefresh.exp,
        });
        setToken(accessToken);
        setRefreshToken(newRefreshToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
      } else {
        console.error("Failed to decode tokens during login");
        throw new Error("Invalid token decoding");
      }
    } catch (err) {
      console.error("Login API error:", err);
      throw err; // rethrow to handle in LoginPage
    }
  };

  // 🔶 Logout function calls logout API if needed
  const logout = async () => {
    try {
      await logoutUser(token); // call your API endpoint to invalidate token
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      setUser(null);
      setToken(null);
      setRefreshToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  // 🔶 Refresh token function (if using token rotation)
  const refreshAccessToken = async () => {
    try {
      const res = await refreshTokenAPI(refreshToken);
      const newAccessToken = res.data.accessToken;
      const decodedAccess = decodeToken(newAccessToken);

      if (decodedAccess) {
        setUser(prev => ({
          ...prev,
          username: decodedAccess.sub,
          role: decodedAccess.role,
        }));
        setToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
      } else {
        throw new Error("Failed to decode refreshed access token");
      }
    } catch (err) {
      console.error("Refresh token error:", err);
      logout(); // logout on refresh failure
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
