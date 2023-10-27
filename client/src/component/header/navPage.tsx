import NavProps from "../../interface/navProps";

function Nav({ setSignInForm, setSignUpForm }: NavProps) {
  if (!setSignInForm) {
    return null;
  }
  if (!setSignUpForm) {
    return null;
  }
  return (
    <header className="flex justify-between border-b border-black pb-3">
      <h1>Member</h1>
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
    </header>
  );
}

export default Nav;
