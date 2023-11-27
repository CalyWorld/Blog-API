import { createContext } from "react";
import { User } from "./userContext";
export interface Comments {
  author: User;
  commentDate: string;
  content: string;
  __v: number;
  _id: string;
  post: string;
}

export interface CommentContextType {
  comments: Comments[];
  setComments: React.Dispatch<React.SetStateAction<Comments[]>>;
}

export const CommentContext = createContext<CommentContextType>({
  comments: [],
  setComments: () => {},
});
