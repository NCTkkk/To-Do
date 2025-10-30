import { createContext, useContext, useState } from "react";
import axios from "axios";

interface AuthUser {
  id: string;
  name: string;
  role: "admin" | "user" | "member";
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (name: string, password: string) => Promise<void>;
  register: (
    name: string,
    password: string,
    role: "admin" | "user" | "member"
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (name: string, password: string) => {
    const res = await axios.post("http://localhost:3000/api/auth/login", {
      name,
      password,
    });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser({ ...user, token });
  };

  const register = async (
    name: string,
    password: string,
    role: "admin" | "user" | "member"
  ) => {
    await axios.post("http://localhost:3000/api/auth/register", {
      name,
      password,
      role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
