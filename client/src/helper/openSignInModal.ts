import NavProps from "../interface/navProps";

export default function openSignInModal({
  setSignInForm,
  setSignUpForm,
}: NavProps) {
  if (setSignInForm && setSignUpForm) {
    setSignInForm(true);
    setSignUpForm(false);
  }
}
