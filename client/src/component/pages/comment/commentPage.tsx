import { FaRegUser } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { formatDate, formatUsername } from "../../../helper/format";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../../../context/userContext";
import EditCommentPage from "./editCommentPage";
import { Comments } from "../../../context/commentContext";
interface CommentPageType {
  comments?: Comments[];
}
export default function CommentPage({ comments }: CommentPageType) {
  const { user } = useContext<UserContextType>(UserContext);
  const [editCommentId, setEditCommentModal] = useState<string>("");

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
      {comments ? (
        comments.map((comment) =>
          editCommentId === comment._id ? (
            <div key={comment._id}>
              <EditCommentPage
                setEditCommentModal={setEditCommentModal}
                comment={comment}
              />
            </div>
          ) : (
            <div className="comment-container" key={comment._id}>
              <div className="comment-profile flex flex-col gap-3 p-3">
                <div className="profile flex items-center gap-3">
                  <FaRegUser size={20} />
                  <div className="username-date-container w-full">
                    <div className="flex justify-between items-center">
                      {formatUsername(comment.author?.username)}
                      {comment.author._id === user?._id && (
                        <div className="cursor-pointer flex gap-1">
                          <div
                            onClick={() => {
                              handleCommentDelete(comment._id);
                            }}
                          >
                            <AiOutlineDelete size={24} />
                          </div>
                          <div
                            onClick={() => {
                              setEditCommentModal(comment._id);
                            }}
                          >
                            <CiEdit size={24} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>{formatDate(comment.commentDate)}</div>
                  </div>
                </div>
                <div>{comment.content}</div>
              </div>
            </div>
          ),
        )
      ) : (
        <div className="flex justify-center">
          <p>Loading, fetching comments</p>
        </div>
      )}
    </div>
  );
}
