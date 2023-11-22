import { FaRegUser } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { formatDate, formatUsername } from "../../helper/format";
import { Post } from "../../context/postContext";
import { useContext, useEffect } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
interface CommentPageType {
  post?: Post | null;
}
export default function CommentPage({ post }: CommentPageType) {
  const { user } = useContext<UserContextType>(UserContext);
  console.log(post);
  const userId = post?.post.author._id;

  async function handleCommentDelete(id: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/comments/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        console.log("comment deleted succesfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {post?.comments ? (
        post.comments.map((comment) => (
          <div className="comment-container" key={comment._id}>
            <div className="comment-profile flex flex-col gap-3 p-3">
              <div className="profile flex items-center gap-3">
                <FaRegUser size={20} />
                <div className="username-date-container w-full">
                  <div className="flex justify-between items-center">
                    {formatUsername(comment.author?.username)}
                    {user?._id === userId ? (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          handleCommentDelete(comment._id);
                        }}
                      >
                        <AiOutlineDelete size={24} />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
