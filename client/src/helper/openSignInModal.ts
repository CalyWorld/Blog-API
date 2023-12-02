import NavProps from "../interface/AuthProps";

export default function openSignInModal({
  setSignInForm,
  setSignUpForm,
}: NavProps) {
  if (setSignInForm && setSignUpForm) {
    setSignInForm(true);
    setSignUpForm(false);
  }
}
