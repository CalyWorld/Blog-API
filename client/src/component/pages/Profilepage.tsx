import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { formatUsername } from "../../helper/format";
import { Link, Routes, Route } from "react-router-dom";
import PublishedPostPage from "./publishedPostPage";
import UnPublishedPostPage from "./unpublishedPostPage";
import { CommentModalType } from "./commentModal";
import UserPostDetail from "./userPostDetail";
export default function ProfilePage({ setCommentModal }: CommentModalType) {
  const { user } = useContext<UserContextType>(UserContext);
  return (
    <div className="flex flex-col gap-5">
      <div className="header-container">
        <h1>{formatUsername(user?.username)}</h1>
      </div>
      <ul className="flex gap-2">
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
          element={<UserPostDetail setCommentModal={setCommentModal} />}
        />
      </Routes>
    </div>
  );
}
