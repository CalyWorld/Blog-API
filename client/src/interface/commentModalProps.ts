import { Comments } from "./commentsProps";
export interface CommentModalType {
  openCommentModal?: boolean;
  comments?: Comments[];
  setCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveLink?: React.Dispatch<React.SetStateAction<string>>;
}
