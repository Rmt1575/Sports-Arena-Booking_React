import React from "react";
import { loginUser, signupUser } from "../utils/mockApi";

const AuthContext = React.createContext(null);

const AUTH_KEY = "SAB_AUTH_V1";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  const login = async (values) => {
    const loggedIn = await loginUser(values);
    setUser(loggedIn);
    localStorage.setItem(AUTH_KEY, JSON.stringify(loggedIn));
    return loggedIn;
  };

  const signup = async (values) => {
    const created = await signupUser(values);
    return created;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};