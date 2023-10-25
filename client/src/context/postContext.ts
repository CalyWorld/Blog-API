import { createContext } from "react";
import mongoose from "mongoose";
export interface Post {
  title?: string | null;
  content?: string | null;
  author?: mongoose.Schema.Types.ObjectId | null;
  publishedDate: Date;
  isPublished: boolean;
  imageUrl: string;
}

export interface PostContextType {
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const postContext = createContext<PostContextType>({
  post: null,
  setPost: () => {},
});
