import Nav from "./component/header/navPage";
import HomePage from "./component/pages/Homepage";
import { Post, PostContext } from "./context/postContext";
import { User, UserContext } from "./context/userContext";
import SignInForm from "./form/signInForm";
import SignUpForm from "./form/signUpForm";
import { useState, useMemo } from "react";
function App() {
  const [user, setUser] = useState<User | null>({});
  const [posts, setPost] = useState<Post[]>([]);
  const [openSignInForm, setSignInForm] = useState<boolean>(false);
  const [openSignUpForm, setSignUpForm] = useState<boolean>(false);
  // Use useMemo to memoize the context value
  const userContextValue = useMemo(() => ({ user, setUser }), [user]);
  const postContextValue = useMemo(() => ({ posts, setPost }), [posts]);
  return (
    <>
      <UserContext.Provider value={userContextValue}>
        <PostContext.Provider value={postContextValue}>
          <div
            className={`app-container ${
              openSignInForm || openSignUpForm ? "blur-sm" : ""
            }`}
          >
            <Nav setSignInForm={setSignInForm} setSignUpForm={setSignUpForm} />
            <HomePage />
            {openSignInForm && (
              <SignInForm
                setSignInForm={setSignInForm}
                setSignUpForm={setSignUpForm}
              />
            )}
            {openSignUpForm && (
              <SignUpForm
                setSignInForm={setSignInForm}
                setSignUpForm={setSignUpForm}
              />
            )}
          </div>
        </PostContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
