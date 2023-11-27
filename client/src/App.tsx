import { Posts, PostsContext } from "./context/postsContext";
import { User, UserContext, UserPostContext } from "./context/userContext";
import SignInForm from "./form/signInForm";
import SignUpForm from "./form/signUpForm";
import { useState, useMemo } from "react";
import RouterPage from "./component/pages/router";

function App() {
  const [user, setUser] = useState<User | null>({});
  const [posts, setPosts] = useState<Posts[]>([]);
  const [userPosts, setUserPost] = useState<Posts[]>([]);
  const [openSignInForm, setSignInForm] = useState<boolean>(false);
  const [openSignUpForm, setSignUpForm] = useState<boolean>(false);
  const [openCommentModal, setCommentModal] = useState<boolean>(false);

  // Use useMemo to memoize the context value
  const userContextValue = useMemo(() => ({ user, setUser }), [user]);
  const postsContextValue = useMemo(() => ({ posts, setPosts }), [posts]);
  const userPostContextValue = useMemo(
    () => ({ userPosts, setUserPost }),
    [userPosts],
  );

  return (
    <UserContext.Provider value={userContextValue}>
      <PostsContext.Provider value={postsContextValue}>
        <UserPostContext.Provider value={userPostContextValue}>
          <div
            className={`app-container ${
              openSignInForm || openSignUpForm ? "blur-sm" : ""
            } flex flex-col gap-20 p-2`}
          >
            <RouterPage
              openCommentModal={openCommentModal}
              setCommentModal={setCommentModal}
              setSignInForm={setSignInForm}
              setSignUpForm={setSignUpForm}
            />
          </div>
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
        </UserPostContext.Provider>
      </PostsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
