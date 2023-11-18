import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { Post } from "../../context/postContext";
import { Link } from "react-router-dom";
import { formatUsername, formatDate, shortenWords } from "../../helper/format";
export default function PublishedPostPage() {
  const { user } = useContext<UserContextType>(UserContext);
  const [userPosts, setUserPost] = useState<Post[] | null>([]);

  console.log("gotten-user-post", userPosts);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await getPostById(user?._id);
        setUserPost(postResponse);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  async function getPostById(id: string | undefined) {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="post-container flex flex-col gap-16">
      {userPosts ? (
        userPosts.map((post) => (
          <Link to={`/@username/published/${post._id}`} key={post._id}>
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
                <img src={post.imageUrl} className="h-full" alt="image-post" />
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
