import { FaRegUser } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { PostContext, PostContextType } from "../../context/postDetailContext";
import {
  PostCommentsContext,
  PostCommentsContextType,
} from "../../context/commentContext";
import { formatDate, formatUsername } from "../../helper/format";
export default function CommentPage() {
  const { post } = useContext<PostContextType>(PostContext);
  const { postComments, setPostComments } =
    useContext<PostCommentsContextType>(PostCommentsContext);

  useEffect(() => {
    getCommentsFromPostId();
  }, []);

  async function getCommentsFromPostId() {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/comments/${post?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const commentData = await response.json();
        setPostComments(commentData);
      }
    } catch (error) {
      console.log("get all comments from user post");
    }
  }
  return (
    <div>
      {postComments.length > 0 ? (
        postComments.map((comment) => (
          <div className="comment-container p-2" key={comment._id}>
            <div className="comment-profile flex flex-col gap-3">
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
                <div>reply</div>
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
