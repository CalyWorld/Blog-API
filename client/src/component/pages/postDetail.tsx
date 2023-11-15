import { useParams } from "react-router-dom";
import { formatDate, formatUsername } from "../../helper/format";
import { FaRegCommentAlt } from "react-icons/fa";
import { Post } from "../../context/postContext";
import { useEffect, useState } from "react";
export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    getPostById(postId);
  }, [postId]);

  async function getPostById(id: string | undefined) {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const post = await response.json();
        setPost(post);
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
              <div className="border-t border-b border-gray-300 p-2">
                <div className="comment-icon-container">
                  <FaRegCommentAlt size={18} />
                </div>
              </div>
            </div>
          </div>
          <div className="image-container flex flex-col items-center">
            <img
              src={post?.imageUrl}
              className="h-full"
              alt="post-description"
            />
          </div>
          <div>{post?.content}</div>
          <div className="border-t border-b border-gray-300 p-2">
            <div className="comment-icon-container">
              <FaRegCommentAlt size={18} />
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
