import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../../context/userContext";
import { Link } from "react-router-dom";
import {
  formatUsername,
  formatDate,
  shortenWords,
} from "../../../helper/format";
import { Posts } from "../../../context/postsContext";
export default function PublishedPostPage() {
  const { user } = useContext<UserContextType>(UserContext);
  const [publishedPost, setPublishedPost] = useState<Posts[]>([]);
  let isPublished: boolean = true;
  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    async function getUserPostWithStatus() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/posts/user/post/${user?._id}/${isPublished}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const userPost = await response.json();
        setPublishedPost(userPost.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserPostWithStatus();
  }, [user?._id]);

  return (
    <div className="post-container flex flex-col gap-y-14">
      {publishedPost?.length ? (
        publishedPost.map((post) => (
          <Link to={`/user/${user?._id}/published/${post._id}`} key={post._id}>
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
