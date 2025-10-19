import { createContext, useState, useContext } from "react";

export interface AuthUser {
  id: string;
  name: string;
  role: "admin" | "user" | "member";
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: "admin" | "user" | "member") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (role: "admin" | "user" | "member") => {
    const fakeUser: AuthUser = {
      id: role === "admin" ? "1" : role === "user" ? "2" : "3",
      name:
        role === "admin"
          ? "Admin Boss"
          : role === "user"
          ? "Main User"
          : "Team Member",
      role,
    };
    setUser(fakeUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
