import { useContext } from "react";
import NavProps from "../../interface/navProps";
import { Outlet } from "react-router-dom";
import { UserContext, UserContextType } from "../../context/userContext";
export default function Nav({ setSignInForm, setSignUpForm }: NavProps) {
  const { user } = useContext<UserContextType>(UserContext);

  if (!setSignInForm) {
    return null;
  }
  if (!setSignUpForm) {
    return null;
  }

  return (
    <>
      {user ? (
        <nav className="flex justify-between border-b border-black pb-3">
          <a href="/">
            <h1>Member</h1>
          </a>
          <ul className="flex gap-5 items-center">
            <li>Make a Post</li>
            <li>Profile</li>
          </ul>
        </nav>
      ) : (
        <nav className="flex justify-between border-b border-black pb-3">
          <a href="/">
            <h1>Member</h1>
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
