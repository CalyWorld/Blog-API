import { useParams } from "react-router-dom";
import { PostContext, PostContextType } from "../../context/postContext";
import { useContext } from "react";
import { formatDate, formatUsername } from "../../helper/format";
export default function PostDetail() {
  const { posts } = useContext<PostContextType>(PostContext);
  const { postId } = useParams();
  const postArr = posts.filter((post) => post._id === postId);

  return (
    <div className="flex items-center justify-center">
      {postArr.map((post) => (
        <div
          className="post-container w-3/4 mx-auto flex flex-col p-5"
          key={post._id}
        >
          <div className="title-text-container flex flex-col gap-5 border-b border-black mb-4">
            <h1>{post.title}</h1>
            <div className="author-container flex flex-col gap-0.5">
              <p className="author-container text-l font-bold text-gray-600">
                {formatUsername(post.author?.username)}
              </p>
              <span className="text-sm">{formatDate(post.publishedDate)}</span>
              <div>comment-icon</div>
            </div>
          </div>
          <div className="image-container flex flex-col items-center">
            <img
              src={post.imageUrl}
              className="h-full"
              alt="post-description"
            />
          </div>
          <div>{post.content}</div>
        </div>
      ))}
    </div>
  );
}
