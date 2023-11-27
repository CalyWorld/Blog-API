import { useParams } from "react-router-dom";
import { formatDate, formatUsername } from "../../../helper/format";
import { FaRegCommentAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CommentModal } from "../comment/commentModal";
import { CommentModalType } from "../../../interface/commentModalProps";
import { Posts } from "../../../context/postsContext";
import { Comments } from "../../../context/commentContext";

export default function PostDetail({
  openCommentModal,
  setCommentModal,
}: CommentModalType) {
  const { postId } = useParams();
  const [post, setPost] = useState<Posts | null>(null);
  const [comments, setComments] = useState<Comments[]>([]);
  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    async function getPostAndComments() {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }),
          fetch(`${API_BASE_URL}/comments/${postId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }),
        ]);

        const postData = await postResponse.json();
        const commentsData = await commentsResponse.json();

        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getPostAndComments();
  }, [postId]);

  return (
    <div className="flex items-center justify-center">
      {post ? (
        <div
          className="post-container w-3/4 mx-auto flex flex-col p-5"
          key={post?._id}
        >
          <div className="title-text-container flex flex-col gap-5 border-black mb-4">
            <h1>{post?.title}</h1>
            <div className="author-container flex flex-col gap-1.5">
              <p className="author-container text-l font-bold text-gray-600">
                {formatUsername(post?.author?.username)}
              </p>
              <span className="text-sm">
                {formatDate(post?.publishedDate || "")}
              </span>
              <div className="border-t border-b border-gray-300">
                <div
                  className="comment-icon-container cursor-pointer"
                  onClick={() => {
                    setCommentModal(true);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <FaRegCommentAlt size={18} />
                    <span>{`${comments.length}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="image-container flex flex-col items-center">
            {post.imageUrl && (
              <img src={post.imageUrl} className="h-full" alt="image-post" />
            )}
          </div>
          <div>{post?.content}</div>
          <div className="border-t border-b border-gray-300">
            <div
              className="comment-icon-container cursor-pointer"
              onClick={() => {
                setCommentModal(true);
              }}
            >
              <div className="flex gap-2 items-center">
                <FaRegCommentAlt size={18} />
                <span>{`${comments.length}`}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Getting Post Detail</p>
        </div>
      )}
      {openCommentModal && (
        <CommentModal setCommentModal={setCommentModal} comments={comments} />
      )}
    </div>
  );
}
