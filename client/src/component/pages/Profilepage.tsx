import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { formatUsername } from "../../helper/format";
import { Link, Routes, Route } from "react-router-dom";
import PublishedPostPage from "./publishedPostPage";
import UnPublishedPostPage from "./unpublishedPostPage";
export default function ProfilePage() {
  const { user } = useContext<UserContextType>(UserContext);

  return (
    <div>
      <div className="header-container">
        <h1>{formatUsername(user?.username)}</h1>
      </div>
      <ul className="flex gap-2">
        <li>
          <Link to={`/@${formatUsername(user?.username)}/published`}>
            Published
          </Link>
        </li>
        <li>
          <Link to="unpublished">Unpublished</Link>
        </li>
      </ul>
      <Routes>
        <Route path="published" element={<PublishedPostPage />} />
        <Route path="unpublished" element={<UnPublishedPostPage />} />
      </Routes>
    </div>
  );
}
