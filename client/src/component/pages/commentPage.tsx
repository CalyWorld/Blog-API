import { FaRegUser } from "react-icons/fa6";

import { formatDate, formatUsername } from "../../helper/format";
import { Post } from "../../context/postContext";
interface CommentPageType {
  post?: Post | null;
}
export default function CommentPage({ post }: CommentPageType) {
  return (
    <div>
      {post?.comments ? (
        post.comments.map((comment) => (
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
