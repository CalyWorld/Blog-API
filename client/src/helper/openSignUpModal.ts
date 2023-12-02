import NavProps from "../interface/AuthProps";

export default function openSignUpModal({
  setSignInForm,
  setSignUpForm,
}: NavProps) {
  if (setSignInForm && setSignUpForm) {
    setSignInForm(false);
    setSignUpForm(true);
  }
}
