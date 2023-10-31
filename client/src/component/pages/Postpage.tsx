import { useParams } from "react-router-dom";
import { PostContext, PostContextType } from "../../context/postContext";
import { useContext } from "react";
import { formatDate, formatUsername } from "../../helper/format";
export default function PostPage() {
  const { posts } = useContext<PostContextType>(PostContext);
  const { postId } = useParams();
  const postArr = posts.filter((post) => post._id === postId);

  return (
    <div className="flex items-center justify-center">
      {postArr.map((post) => (
        <div
          className="post-container w-full flex flex-col w-75"
          key={post._id}
        >
          <div className="title-text-container flex flex-col gap-5">
            <h1>{post.title}</h1>
            <div className="author-container flex flex-col gap-0.5">
              <p className="author-container text-l font-bold text-gray-600">
                {formatUsername(post.author?.username)}
              </p>
              <span>{formatDate(post.publishedDate)}</span>
              <div>comment-icon</div>
            </div>
          </div>
          <div className="image-container max-w-md">
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
