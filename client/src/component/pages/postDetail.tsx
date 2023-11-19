import { useParams } from "react-router-dom";
import { formatDate, formatUsername } from "../../helper/format";
import { FaRegCommentAlt } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { CommentModalType } from "./commentModal";
import { PostContext, PostContextType } from "../../context/postContext";

export default function PostDetail({ setCommentModal }: CommentModalType) {
  const { postId } = useParams();
  const { post, setPost } = useContext<PostContextType>(PostContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await getPostById(postId);
        setPost(postResponse);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [postId]);

  async function getPostById(id: string | undefined) {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-center">
      {post ? (
        <div
          className="post-container w-3/4 mx-auto flex flex-col p-5"
          key={post?.post._id}
        >
          <div className="title-text-container flex flex-col gap-5 border-black mb-4">
            <h1>{post?.post.title}</h1>
            <div className="author-container flex flex-col gap-1.5">
              <p className="author-container text-l font-bold text-gray-600">
                {formatUsername(post?.post.author?.username)}
              </p>
              <span className="text-sm">
                {formatDate(post?.post.publishedDate || "")}
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
                    <span>{`${post.comments.length}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="image-container flex flex-col items-center">
            {post.post.imageUrl && (
              <img
                src={post.post.imageUrl}
                className="h-full"
                alt="image-post"
              />
            )}
          </div>
          <div>{post?.post.content}</div>
          <div className="border-t border-b border-gray-300">
            <div
              className="comment-icon-container cursor-pointer"
              onClick={() => {
                setCommentModal(true);
              }}
            >
              <div className="flex gap-2 items-center">
                <FaRegCommentAlt size={18} />
                <span>{`${post.comments.length}`}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Getting Post Detail</p>
        </div>
      )}
    </div>
  );
}
