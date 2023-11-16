import { createContext } from "react";
import { Post } from "./postContext";

export interface PostContextType {
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const PostContext = createContext<PostContextType>({
  post: null,
  setPost: () => {},
});
