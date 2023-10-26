import React, { useContext, useEffect } from "react";
import { PostContextType, PostContext } from "../../context/postContext";
import formatDate from "../../helper/formatDate";

export default function HomePage() {
  const { posts, setPost } = useContext<PostContextType>(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const response = await fetch("http://localhost:3000/posts");
      if (response.ok) {
        const posts = await response.json();
        console.log(posts);
        setPost(posts);
      } else {
        console.log("Failed to fetch posts");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div key={post._id} className="flex">
          <div className="left-side-bar">
            <div className="author-container">{post.author?.username}</div>
            <div className="title-container">{post.title}</div>
            <div className="content-container">{post.content}</div>
            <div className="date-container">
              {formatDate(post.publishedDate)}
            </div>
          </div>
          <div className="right-side-bar">
            <div className="image-container">
              <img src={post.imageUrl} alt="image-post" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
