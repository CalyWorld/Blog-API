import { useContext, useEffect, useState } from "react";
import {
  UserContext,
  UserContextType,
  UserPostContext,
  UserPostContextType,
} from "../../../context/userContext";
import { formatUsername } from "../../../helper/format";
import { Link, Routes, Route } from "react-router-dom";
import PublishedPostPage from "./publishedPostPage";
import UnPublishedPostPage from "./unpublishedPostPage";
import { CommentModalType } from "../../../interface/commentModalProps";
import UserPostDetail from "./userPostDetail";
export default function ProfilePage({
  openCommentModal,
  setCommentModal,
}: CommentModalType) {
  const { user } = useContext<UserContextType>(UserContext);
  const { setUserPost } = useContext<UserPostContextType>(UserPostContext);
  const [activeLink, setActiveLink] = useState("published");
  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    async function getUserPost() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/posts/user/post/${user?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const userPost = await response.json();
        setUserPost(userPost);
      } catch (err) {
        console.log(err);
      }
    }
    getUserPost();
  }, []);

  return (
    <nav className="flex flex-col gap-5">
      <ul className="header-container">
        <li>
          <h1>{formatUsername(user?.username)}</h1>
        </li>
      </ul>
      <ul className="flex gap-5 border-b border-gray-400">
        <li
          className={
            activeLink === "published" ? "border-b-2 border-gray-800" : ""
          }
        >
          <Link
            to={`/user/${user?._id}/published`}
            onClick={() => setActiveLink("published")}
            className="hover:cursor-pointer"
          >
            Published
          </Link>
        </li>
        <li
          className={
            activeLink === "unpublished" ? "border-b-2 border-gray-800" : ""
          }
        >
          <Link
            to={`/user/${user?._id}/unpublished`}
            onClick={() => setActiveLink("unpublished")}
            className="hover:cursor-pointer"
          >
            Unpublished
          </Link>
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
