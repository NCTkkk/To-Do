import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthUser {
  id: string;
  name: string;
  role: "admin" | "user" | "member";
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (name: string, password: string) => Promise<AuthUser>;
  register: (
    name: string,
    password: string,
    role: "admin" | "user" | "member"
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () =>
    // @ts-ignore: default stub
    null as unknown as AuthUser,
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          id: payload.id,
          name: payload.name,
          role: payload.role,
          token,
        });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (name: string, password: string): Promise<AuthUser> => {
    const res = await axios.post("http://localhost:3000/api/auth/login", {
      name,
      password,
    });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const authUser: AuthUser = { ...user, token };
    setUser(authUser);
    return authUser;
  };

  const register = async (
    name: string,
    password: string,
    role: "admin" | "user" | "member"
  ): Promise<void> => {
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
