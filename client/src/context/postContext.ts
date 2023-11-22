import { createContext } from "react";
import { User } from "./userContext";

export interface Comment {
  author: {
    _id: string;
    username: string;
    password: string;
  };
  commentDate: string;
  content: string;
  __v: number;
  _id: string;
  post: string;
}

export interface Post {
  post: {
    title: string;
    content: string;
    author: User;
    publishedDate: string;
    isPublished: boolean;
    imageUrl: string;
    _id: string;
  };
  comments: Comment[];
}

export interface PostContextType {
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const PostContext = createContext<PostContextType>({
  post: null,
  setPost: () => {},
});
