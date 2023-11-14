import { CiBookmark } from "react-icons/ci";
import { PiSignOutThin } from "react-icons/pi";
import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import Cookies from "js-cookie";
export default function ProfileModal() {
  const { user, setUser } = useContext<UserContextType>(UserContext);

  async function logOut() {
    try {
      const response = await fetch(
        `http://localhost:3000/${user?.username}/logout`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log(response);
      // if (response.ok) {
      //   console.log("Logged-out successfully");
      //   Cookies.remove("userInfo");
      //   setUser(null);
      // } else {
      //   console.log("Logout failed");
      // }
    } catch (error) {
      console.log("An error occurred during logout", error);
    }
  }
  return (
    <div className="profile-modal flex flex-col gap-5 right-0 mr-5 mt-8 w-64 h-64">
      <div className="flex items-center gap-2 p-4">
        <CiBookmark size={24} />
        <p>Posts</p>
      </div>
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
