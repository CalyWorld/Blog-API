import { createContext } from "react";
import mongoose from "mongoose";
export interface Comment {
  content?: string | null;
  author?: mongoose.Schema.Types.ObjectId | null;
  post: mongoose.Schema.Types.ObjectId | null;
  commentDate: string;
}

export interface CommentContextType {
  comment: Comment | null;
  setComment: React.Dispatch<React.SetStateAction<Comment | null>>;
}

export const commentContext = createContext<CommentContextType>({
  comment: null,
  setComment: () => {},
});
