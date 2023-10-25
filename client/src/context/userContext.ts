import { createContext } from "react";

export interface User {
  username?: string | null;
  password?: string | null;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const userContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
