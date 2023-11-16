import { FaRegUser } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { useContext } from "react";
import { formatDate, formatUsername } from "../../helper/format";
import {
  PostCommentsContext,
  PostCommentsContextType,
} from "../../context/commentContext";
export default function CommentPage() {
  const { postComments } =
    useContext<PostCommentsContextType>(PostCommentsContext);

  return (
    <div>
      {postComments.length > 0 ? (
        postComments.map((comment) => (
          <div className="comment-container" key={comment._id}>
            <div className="comment-profile flex flex-col gap-3 p-3">
              <div className="profile flex items-center gap-3">
                <FaRegUser size={20} />
                <div className="username-date-container">
                  <div>{formatUsername(comment.author?.username)}</div>
                  <div>{formatDate(comment.commentDate)}</div>
                </div>
              </div>
              <div>{comment.content}</div>
              <div className="comment-icon-reply-container flex justify-between items-center">
                <FaRegCommentAlt />
                <div className="cursor-pointer">Reply</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <p>Loading, fetching comments</p>
        </div>
      )}
    </div>
  );
}
