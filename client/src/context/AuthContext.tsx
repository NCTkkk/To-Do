import { createContext, useState, useContext } from "react";

export interface AuthUser {
  id: string;
  name: string;
  role: "user" | "member";
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: "user" | "member") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (role: "user" | "member") => {
    const fakeUser: AuthUser = {
      id: role === "user" ? "1" : "2",
      name: role === "user" ? "Admin User" : "Member User",
      role,
    };
    setUser(fakeUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
