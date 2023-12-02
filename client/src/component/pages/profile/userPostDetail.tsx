import { useParams } from "react-router-dom";
import { CommentModal } from "../comment/commentModal";
import { CommentModalType } from "../../../interface/commentModalProps";
import { formatDate, formatUsername } from "../../../helper/format";
import { FaRegCommentAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Posts } from "../../../context/postsContext";
import { BsThreeDots } from "react-icons/bs";
import UtilityPage from "../../../helper/utilityPage";
import EditPostPage from "../post/editPostPage";
import { Comments } from "../../../interface/commentsProps";
export default function UserPostDetail({
  openCommentModal,
  setCommentModal,
  setActiveLink,
}: CommentModalType) {
  const { postId } = useParams();
  const [post, setPost] = useState<Posts | null>(null);
  const [comments, setComments] = useState<Comments[]>([]);
  const [openUtilites, setOpenUtility] = useState<boolean>(false);
  const [openEditForm, setEditForm] = useState<boolean>(false);
  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    async function getPostAndComments() {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: "GET",
          }),
          fetch(`${API_BASE_URL}/comments/${postId}`, {
            method: "GET",
          }),
        ]);

        const postData = await postResponse.json();
        const commentsData = await commentsResponse.json();

        setPost(postData.data);
        setComments(commentsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getPostAndComments();
  }, [postId]);

  return (
    <div className="flex items-center justify-center">
      {openEditForm ? (
        <EditPostPage post={post} setEditForm={setEditForm} />
      ) : post ? (
        <div
          className="post-container w-3/4 mx-auto flex flex-col p-5"
          key={post._id}
        >
          <div className="title-text-container flex flex-col gap-5 border-black mb-4">
            <h1>{post.title}</h1>
            <div className="author-container flex flex-col gap-1.5">
              <p className="author-container text-l font-bold text-gray-600">
                {formatUsername(post.author?.username)}
              </p>
              <span className="text-sm">
                {formatDate(post.publishedDate || "")}
              </span>
              <div className="flex justify-between items-center border-t border-b border-gray-300">
                <div
                  className="comment-icon-container flex gap-2 items-center cursor-pointer"
                  onClick={() => {
                    setCommentModal(true);
                  }}
                >
                  <FaRegCommentAlt size={18} />
                  <span>{`${comments.length}`}</span>
                </div>
                <div
                  className="relative utility-icon-container cursor-pointer"
                  onClick={() => {
                    setOpenUtility(!openUtilites);
                  }}
                >
                  <BsThreeDots size={18} />
                  {openUtilites && (
                    <UtilityPage
                      post={post}
                      setEditForm={setEditForm}
                      setActiveLink={setActiveLink}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="image-container flex flex-col items-center">
            {post.imageUrl && (
              <img src={post.imageUrl} className="h-full" alt="image-post" />
            )}
          </div>
          <div className="mt-5">{post.content}</div>
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
