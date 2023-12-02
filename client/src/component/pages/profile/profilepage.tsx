import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../../../context/userContext";
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
  const [activeLink, setActiveLink] = useState<string>("");

  return (
    <nav className="flex flex-col gap-5">
      <ul className="header-container">
        <li className="flex gap-3 items-center">
          <h1>Welcome</h1>
          <p className="font-medium">{formatUsername(user?.username)}</p>
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
              setActiveLink={setActiveLink}
            />
          }
        />
        <Route
          path="unpublished/:postId"
          element={
            <UserPostDetail
              openCommentModal={openCommentModal}
              setCommentModal={setCommentModal}
              setActiveLink={setActiveLink}
            />
          }
        />
      </Routes>
    </nav>
  );
}
