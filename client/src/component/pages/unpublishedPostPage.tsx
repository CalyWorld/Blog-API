import { useContext } from "react";
import {
  UserPostContext,
  UserPostContextType,
} from "../../context/userContext";
import { Link } from "react-router-dom";
import { formatUsername, formatDate, shortenWords } from "../../helper/format";
export default function UnPublishedPostPage() {
  const { userPosts } = useContext<UserPostContextType>(UserPostContext);

  const unPublishedPosts = userPosts?.filter(
    (post) => post.isPublished === false,
  );
  return (
    <div className="post-container flex flex-col gap-5">
      {unPublishedPosts?.length ? (
        unPublishedPosts.map((post) => (
          <Link to={`/@username/unpublished/${post._id}`} key={post._id}>
            <div className="flex justify-between">
              <div className="left-side-bar w-48 flex flex-col justify-between gap-2">
                <p className="author-container text-xs font-bold text-gray-600">
                  {formatUsername(post.author?.username)}
                </p>
                <div className="title-container">
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                </div>
                <div className="content-container text-gray-400">
                  {shortenWords(post.content)}
                </div>
                <div className="date-container text-xs text-gray-400">
                  {formatDate(post.publishedDate)}
                </div>
              </div>
              <div className="right-side-bar w-36">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    className="h-full"
                    alt="image-post"
                  />
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex flex-col items-center">
          <p>No Published Post</p>
        </div>
      )}
    </div>
  );
}