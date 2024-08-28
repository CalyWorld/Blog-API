export default interface AuthProps {
  setSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
  setGetStarted?: React.Dispatch<React.SetStateAction<boolean>>;
}
