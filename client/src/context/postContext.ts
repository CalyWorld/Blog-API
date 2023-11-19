import { createContext } from "react";

export interface Post {
  post: {
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
  };
  comments: {
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
  }[];
}

export interface PostContextType {
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const PostContext = createContext<PostContextType>({
  post: null,
  setPost: () => {},
});
