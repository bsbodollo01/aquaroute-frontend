import React, { createContext, useContext, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  role: "BUYER" | "SELLER";
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return jwtDecode<User>(token);
  });

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return React.createElement(AuthContext.Provider, { value: { user, setUser, logout } }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};


