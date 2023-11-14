import { CiBookmark } from "react-icons/ci";
import { PiSignOutThin } from "react-icons/pi";
import Cookies from "js-cookie";
export default function ProfileModal() {
  const user = Cookies.get("userInfo");
  console.log({ user_profile: user });
  return (
    <div className="profile-modal flex flex-col gap-5 right-0 mr-5 mt-8 w-64 h-64">
      <div className="flex items-center gap-2 p-4">
        <CiBookmark size={24} />
        <p>Posts</p>
      </div>
      <div className="flex items-center gap-2 p-4">
        <PiSignOutThin size={24} />
        <p>Sign out</p>
      </div>
      <div className="p-4">
        <p>{user.username}</p>
      </div>
    </div>
  );
}
