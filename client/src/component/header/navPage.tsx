import { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import ProfileModal from "../pages/profile/profileModal";
import Cookies from "js-cookie";
import { UserContext, UserContextType } from "../../context/userContext";
import { FaPenAlt } from "react-icons/fa";
import FooterPage from "../footer/footer";
import AuthProps from "../../interface/AuthProps";

export default function Nav({ setSignInForm, setSignUpForm }: AuthProps) {
  const { user, setUser } = useContext<UserContextType>(UserContext);
  const [openProfileModal, setProfileModal] = useState<boolean>(false);

  console.log(user);
  useEffect(() => {
    const userInfo = Cookies.get("userInfo");
    if (userInfo) {
      const userCookies = JSON.parse(userInfo);
      setUser(userCookies);
    }
  }, []);

  if (!setSignInForm || !setSignUpForm) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {user?.username ? (
        <header>
          <nav className="flex justify-between border-b border-gray-400 pb-3 items-center">
            <a href="/">
              <h1 className="text-lg sm:text-xl">Infinite Insights</h1>
            </a>
            <ul className="flex gap-8 items-center">
              <Link to="/new-story">
                <li className="flex items-center gap-2">
                  <FaPenAlt />
                  <div>
                    <p>Write</p>
                  </div>
                </li>
              </Link>
              <li>
                <div
                  className="cursor-pointer"
                  onClick={() => setProfileModal(!openProfileModal)}
                >
                  <FaRegUser size={24} />
                </div>
                {openProfileModal && (
                  <ProfileModal setProfileModal={setProfileModal} />
                )}
              </li>
            </ul>
          </nav>
        </header>
      ) : (
        <nav className="sm:items-center flex justify-between">
          <a href="/">
            <h1 className="xs:text-3xl">Infinite Insights</h1>
          </a>
          <ul className="flex gap-5 items-center">
            <li className="xs:hidden sm:hidden md:block">
              <button
                onClick={() => setSignInForm(true)}
                className="px-4 py-2 text-black"
              >
                Sign In
              </button>
            </li>
            <li className="xs:block md:block">
              <button
                onClick={() => setSignUpForm(true)}
                className="px-4 py-2 bg-black text-white rounded-full"
              >
                Get Started
              </button>
            </li>
          </ul>
        </nav>
      )}
      <section className="flex-1 mt-20">
        <div id="detail">
          <Outlet />
        </div>
      </section>
      <FooterPage />
    </div>
  );
}
