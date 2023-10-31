import { PostContext, PostContextType } from "../../context/postContext";
import { useContext } from "react";

export default function PostPage() {
  const { posts } = useContext<PostContextType>(PostContext);
  console.log(posts);
  return (
    <>
      {/* {posts.map((post) => (
        <div className="post-container">
          <div className="title-text-container">
            <h1>{post.title}</h1>
            <div className="author-container">
              <p>{post.author?.username}</p>
              <div>{post.publishedDate}</div>
            </div>
          </div>
          <div>{post.content}</div>
        </div>
      ))} */}
      hello
    </>
  );
}
