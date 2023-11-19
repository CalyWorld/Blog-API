import { createContext } from "react";
import { Posts } from "./postsContext";
export interface UserPublishedPostContextType {
  userPublishedPosts: Posts[];
  setUserPublishedPost: React.Dispatch<React.SetStateAction<Posts[]>>;
}

export const UserPublishedPostContext =
  createContext<UserPublishedPostContextType>({
    userPublishedPosts: [],
    setUserPublishedPost: () => {},
  });

export interface UserUnPublishedPostContextType {
  userUnPublishedPosts: Posts[];
  setUserUnPublishedPost: React.Dispatch<React.SetStateAction<Posts[]>>;
}

export const UserUnPublishedPostContext =
  createContext<UserUnPublishedPostContextType>({
    userUnPublishedPosts: [],
    setUserUnPublishedPost: () => {},
  });
