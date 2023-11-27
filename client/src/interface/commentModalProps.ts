import { Comments } from "../context/commentContext";
export interface CommentModalType {
  openCommentModal?: boolean;
  comments?: Comments[];
  setCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
}
