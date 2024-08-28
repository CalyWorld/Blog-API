import AuthProps from "../../interface/AuthProps";
import { IoMdClose } from "react-icons/io";
export default function GetStarted({
  setSignInForm,
  setSignUpForm,
  setGetStarted,
}: AuthProps) {
  if (!setSignInForm && !setSignUpForm) return;

  function handleCloseClick() {
    if (setGetStarted) {
      setGetStarted(false);
    }
  }
  return (
    <div>
      <div className="flex justify-end items-center" onClick={handleCloseClick}>
        <IoMdClose size={30} />
      </div>
      <div
        style={{
          position: "absolute",
          width: "80%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "inherit",
        }}
      >
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl">Join Infinite Insights.</h1>
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col items-center mt-20">
            <button
              onClick={() => setSignUpForm(true)}
              className="w-full border border-black px-4 py-2 rounded-full"
            >
              Sign up with email
            </button>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <p>Already have an account?</p>{" "}
            <button
              onClick={() => setSignInForm(true)}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
