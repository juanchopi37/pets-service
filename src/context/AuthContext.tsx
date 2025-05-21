import { createContext, useState, useContext, useEffect } from "react";
import { User, AuthContextType } from "../utils/types";
import { getUserByEmail, addUser, getUsers } from "../utils/localStorage";

// Create a context with a default value
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => false,
  register: () => false,
  logout: () => {},
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved auth on page load
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAdmin(user.role === "admin");
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const user = getUserByEmail(email);

    if (user && user.password === password) {
      setCurrentUser(user);
      setIsAdmin(user.role === "admin");
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    // Check if user already exists
    if (getUserByEmail(email)) {
      return false;
    }

    // Create new user
    const users = getUsers();
    const newUser: User = {
      id: (users.length + 1).toString(),
      email,
      password,
      name,
      role: "user",
    };

    addUser(newUser);
    setCurrentUser(newUser);
    setIsAdmin(false);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
