import { useContext, useEffect } from "react";
import { PostContext, PostContextType } from "../context/postContext";

export default function getPosts() {
  const { setPost } = useContext<PostContextType>(PostContext);

  useEffect(() => {
    async function fetchPosts() {
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

    fetchPosts();
  }, []);
}
