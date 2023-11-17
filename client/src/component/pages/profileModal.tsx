import { CiBookmark } from "react-icons/ci";
import { PiSignOutThin } from "react-icons/pi";
import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { formatUsername } from "../../helper/format";
interface SetProfileModal {
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ProfileModal({ setProfileModal }: SetProfileModal) {
  const { user, setUser } = useContext<UserContextType>(UserContext);
  let username = formatUsername(user?.username);
  async function logOut() {
    try {
      const response = await fetch(`http://localhost:3000/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const emptyUser = await response.json();
        Cookies.remove("userInfo");
        setUser(emptyUser);
        setProfileModal(false);
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("An error occurred during logout", error);
    }
  }
  return (
    <div className="profile-modal flex flex-col gap-5 right-0 mr-5 mt-8 w-64 h-64">
      <Link to={`/@${username}`}>
        <div className="flex items-center gap-2 p-4 cursor-pointer">
          <CiBookmark size={24} />
          <p>Posts</p>
        </div>
      </Link>
      <div className="flex flex-col p-4 gap-2">
        <div className="flex items-center gap-2">
          <PiSignOutThin size={24} />
          <div
            className="cursor-pointer"
            onClick={() => {
              logOut();
            }}
          >
            Sign out
          </div>
        </div>
        <p>{user?.username}</p>
      </div>
    </div>
  );
}
