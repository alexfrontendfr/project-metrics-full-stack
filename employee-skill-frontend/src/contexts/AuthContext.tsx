import React, { createContext, useState, useContext } from "react";
import { useRouter } from "next/router";
import api from "../lib/api";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/api/v1/login", {
        user: { email, password },
      });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      router.push("/metrics");
    } catch (error) {
      console.error("Login error:", error);
      // You might want to set an error state here or show a toast notification
      throw error; // Re-throw the error if you want to handle it in the component that calls login
    }
  };
  const register = async (
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      const response = await api.post("/api/v1/register", {
        user: { email, password, password_confirmation },
      });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      router.push("/metrics");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.delete("/api/v1/logout");
      setUser(null);
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
