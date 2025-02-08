import { User } from "@/types/User";
import { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  user: User | null;
  setUser: (userData: User) => void;
  clear: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const setUserData = (userData: User) => setUser(userData);
  const clear = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser: setUserData, clear }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
