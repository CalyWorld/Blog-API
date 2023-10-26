import NavProps from "../interface/navProps";

export default function openSignUpModal({
  setSignInForm,
  setSignUpForm,
}: NavProps) {
  if (setSignInForm && setSignUpForm) {
    setSignInForm(false);
    setSignUpForm(true);
  }
}
