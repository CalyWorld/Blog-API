import NavProps from "../../interface/navProps";

export default function Nav({ setSignInForm, setSignUpForm }: NavProps) {
  if (!setSignInForm) {
    return null;
  }
  if (!setSignUpForm) {
    return null;
  }
  return (
    <>
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
    </>
  );
}
