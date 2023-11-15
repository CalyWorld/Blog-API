import { useContext, useEffect, useState } from "react";
import NavProps from "../../interface/navProps";
import { Outlet } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import ProfileModal from "../pages/profileModal";
import Cookies from "js-cookie";
import { UserContext, UserContextType } from "../../context/userContext";
export default function Nav({ setSignInForm, setSignUpForm }: NavProps) {
  const { user, setUser } = useContext<UserContextType>(UserContext);
  const [openProfileModal, setProfileModal] = useState<boolean>(false);

  useEffect(() => {
    const userInfo = Cookies.get("userInfo");
    if (userInfo) {
      const userCookies = JSON.parse(userInfo);
      setUser(userCookies);
    }
  }, []);

  if (!setSignInForm) {
    return null;
  }
  if (!setSignUpForm) {
    return null;
  }

  return (
    <>
      {user?.username ? (
        <nav className="flex justify-between border-b border-black pb-3">
          <a href="/">
            <h1>Infinite Insights</h1>
          </a>
          <ul className="flex gap-8 items-center">
            <li>Write</li>
            <li>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setProfileModal(!openProfileModal);
                }}
              >
                <FaRegUser size={24} />
              </div>
              {openProfileModal && (
                <ProfileModal setProfileModal={setProfileModal} />
              )}
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="flex justify-between border-b border-black pb-3">
          <a href="/">
            <h1>Infinite Insights</h1>
          </a>
          <ul className="flex gap-5 items-center">
            <li>
              <button onClick={() => setSignInForm(true)}>Sign In</button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSignUpForm(true);
                }}
              >
                Get Started
              </button>
            </li>
          </ul>
        </nav>
      )}

      <section>
        <div id="detail">
          <Outlet />
        </div>
      </section>
    </>
  );
}
