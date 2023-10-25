import Nav from "./component/pages/navPage";
import SignInForm from "./form/signInForm";
import SignUpForm from "./form/signUpForm";
import { useState } from "react";
function App() {
  const [openSignInForm, setSignInForm] = useState<boolean>(false);
  const [openSignUpForm, setSignUpForm] = useState<boolean>(false);
  return (
    <>
      <div
        className={`app-container ${
          openSignInForm || openSignUpForm ? "blur-sm" : ""
        }`}
      >
        <Nav setSignInForm={setSignInForm} setSignUpForm={setSignUpForm} />
      </div>
      {openSignInForm && (
        <SignInForm
          setSignInForm={setSignInForm}
          setSignUpForm={setSignUpForm}
        />
      )}
      {openSignUpForm && <SignUpForm setSignUpForm={setSignUpForm} />}
    </>
  );
}

export default App;
