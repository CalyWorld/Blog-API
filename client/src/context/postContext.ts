import { createContext } from "react";
export interface Post {
  title: string;
  content: string;
  author?: {
    _id: string;
    username: string;
    password: string;
  };
  publishedDate: string;
  isPublished: boolean;
  imageUrl: string;
  _id: string;
}

export interface PostContextType {
  posts: Post[];
  setPost: React.Dispatch<React.SetStateAction<Post[]>>;
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  setPost: () => {},
});
