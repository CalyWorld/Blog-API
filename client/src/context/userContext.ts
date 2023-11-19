import { createContext } from "react";
import { Posts } from "./postsContext";
export interface User {
  username?: string;
  password?: string;
  _id?: string;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export interface UserPostContextType {
  userPosts: Posts[];
  setUserPost: React.Dispatch<React.SetStateAction<Posts[]>>;
}

export const UserPostContext = createContext<UserPostContextType>({
  userPosts: [],
  setUserPost: () => {},
});
