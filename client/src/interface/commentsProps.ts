import { User } from "../context/userContext";
export interface Comments {
  author: User;
  commentDate: string;
  content: string;
  __v: number;
  _id: string;
  post: string;
}
