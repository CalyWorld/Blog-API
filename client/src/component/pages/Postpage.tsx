import { useContext, useEffect } from "react";
import { PostsContextType, PostsContext } from "../../context/postsContext";
import { formatDate, formatUsername, shortenWords } from "../../helper/format";
import { Link } from "react-router-dom";
import { UserContext, UserContextType } from "../../context/userContext";
export default function PostPage() {
  const { posts, setPosts } = useContext<PostsContextType>(PostsContext);
  const { user } = useContext<UserContextType>(UserContext);

  const otherUsersPublishedPosts = posts.filter(
    (post) => post.isPublished === true && post.author?._id !== user?._id,
  );

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const posts = await response.json();
          setPosts(posts);
        } else {
          console.log("Failed to fetch posts");
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="post-container flex flex-col gap-16">
      {otherUsersPublishedPosts.length > 0 ? (
        otherUsersPublishedPosts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
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
