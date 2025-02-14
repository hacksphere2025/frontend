import { Product } from "@/types/Product/Product";
import { SidebarSession, User } from "@/types/User";
import { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  user: User | null;
  setUser: (userData: User) => void;
  cart: Map<string, Cart>;
  setCart: (key: string, value: Cart) => void;
  removeElementCart: (key: string) => void;
  selectedSession: string;
  setSelectedSession: React.Dispatch<React.SetStateAction<string>>;
  setSession: React.Dispatch<React.SetStateAction<SidebarSession[]>>;
  session: SidebarSession[];
  clear: () => void;
};

type Cart = {
  product: Product;
  quantity: number;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Map<string, Cart>>(new Map<string, Cart>());
  const [session, setSession] = useState<SidebarSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>("");

  const setUserData = (userData: User) => setUser(userData);

  const updateMap = (key: string, value: Cart) => {
    setCart((map) => new Map(map.set(key, value)));
  };

  const removeMap = (key: string) => {
    setCart((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  };

  const clear = () => {
    setUser(null);
    setCart(new Map<string, Cart>());
    setSession([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserData,
        cart,
        setCart: updateMap,
        removeElementCart: removeMap,
        setSession: setSession,
        session,
        clear,
        setSelectedSession,
        selectedSession,
      }}
    >
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
