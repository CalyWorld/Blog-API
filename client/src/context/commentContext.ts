import { createContext } from "react";
import { Post } from "./postContext";
export interface PostComments {
  content?: string | null;
  author?: {
    _id: string;
    username: string;
    password: string;
  };
  post: Post;
  commentDate: string;
  _id: string;
}

export interface PostCommentsContextType {
  postComments: PostComments[];
  setPostComments: React.Dispatch<React.SetStateAction<PostComments[]>>;
}

export const PostCommentsContext = createContext<PostCommentsContextType>({
  postComments: [],
  setPostComments: () => {},
});
