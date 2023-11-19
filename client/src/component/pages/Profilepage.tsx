import { useContext, useEffect } from "react";
import {
  UserContext,
  UserContextType,
  UserPostContext,
  UserPostContextType,
} from "../../context/userContext";
import { formatUsername } from "../../helper/format";
import { Link, Routes, Route } from "react-router-dom";
import PublishedPostPage from "./publishedPostPage";
import UnPublishedPostPage from "./unpublishedPostPage";
import { CommentModalType } from "./commentModal";
import UserPostDetail from "./userPostDetail";
export default function ProfilePage({
  openCommentModal,
  setCommentModal,
}: CommentModalType) {
  const { user } = useContext<UserContextType>(UserContext);
  const { setUserPost } = useContext<UserPostContextType>(UserPostContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await getUserPost(user?._id);
        setUserPost(postResponse);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  async function getUserPost(id: string | undefined) {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/user/post/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (response.ok) {
        return response.json();
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <nav className="flex flex-col gap-5">
      <ul className="header-container">
        <li>
          <h1>{formatUsername(user?.username)}</h1>
        </li>
      </ul>
      <ul className="flex gap-5 border-b border-black">
        <li>
          <Link to={`/@username/published`}>Published</Link>
        </li>
        <li>
          <Link to={`/@username/Unpublished`}>Unpublished</Link>
        </li>
      </ul>
      <Routes>
        <Route path="published" element={<PublishedPostPage />} />
        <Route path="unpublished" element={<UnPublishedPostPage />} />
        <Route
          path="published/:postId"
          element={
            <UserPostDetail
              openCommentModal={openCommentModal}
              setCommentModal={setCommentModal}
            />
          }
        />
        <Route
          path="unpublished/:postId"
          element={
            <UserPostDetail
              openCommentModal={openCommentModal}
              setCommentModal={setCommentModal}
            />
          }
        />
      </Routes>
    </nav>
  );
}
