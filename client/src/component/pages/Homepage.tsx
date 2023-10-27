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
    <div className="post-container flex flex-col gap-16">
      {posts.map((post) => (
        <div key={post._id} className="flex justify-between">
          <div className="left-side-bar w-48 flex flex-col justify-between gap-2">
            <p className="author-container text-xs font-bold text-gray-600">
              {post.author?.username.split("@").shift() + ""}{" "}
            </p>
            <div className="title-container">
              <h2 className="text-2xl font-bold">{post.title}</h2>
            </div>
            <div className="content-container text-gray-400">
              {post.content.split(".").shift() + "."}{" "}
            </div>
            <div className="date-container text-xs text-gray-400">
              {formatDate(post.publishedDate)}
            </div>
          </div>
          <div className="right-side-bar w-36">
            <img src={post.imageUrl} className="h-full" alt="image-post" />
          </div>
        </div>
      ))}
    </div>
  );
}
