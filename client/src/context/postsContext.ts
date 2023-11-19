import { createContext } from "react";
export interface Posts {
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
    password: string;
  };
  publishedDate: string;
  isPublished: boolean;
  imageUrl: string;
  _id: string;
}

export interface PostsContextType {
  posts: Posts[];
  setPosts: React.Dispatch<React.SetStateAction<Posts[]>>;
}

export const PostsContext = createContext<PostsContextType>({
  posts: [],
  setPosts: () => {},
});
