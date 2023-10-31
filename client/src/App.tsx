import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./component/header/navPage";
import getPosts from "./hooks/fetchPost";
import HomePage from "./component/pages/Homepage";
import { Post, PostContext } from "./context/postContext";
import { User, UserContext } from "./context/userContext";
import SignInForm from "./form/signInForm";
import SignUpForm from "./form/signUpForm";
import { useState, useMemo } from "react";
import ErrorPage from "./component/pages/ErrorPage";
import PostPage from "./component/pages/Postpage";

function App() {
  getPosts();
  const [user, setUser] = useState<User | null>({});
  const [posts, setPost] = useState<Post[]>([]);
  const [openSignInForm, setSignInForm] = useState<boolean>(false);
  const [openSignUpForm, setSignUpForm] = useState<boolean>(false);

  // Use useMemo to memoize the context value
  const userContextValue = useMemo(() => ({ user, setUser }), [user]);
  const postContextValue = useMemo(() => ({ posts, setPost }), [posts]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <header className="flex justify-between border-b border-black pb-3">
            <Nav setSignInForm={setSignInForm} setSignUpForm={setSignUpForm} />
          </header>
          <section>
            <HomePage
              setSignInForm={setSignInForm}
              setSignUpForm={setSignUpForm}
            />
          </section>
        </>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "post/:postId",
      element: <PostPage />,
    },
  ]);

  return (
    <>
      <UserContext.Provider value={userContextValue}>
        <PostContext.Provider value={postContextValue}>
          <div
            className={`app-container ${
              openSignInForm || openSignUpForm ? "blur-sm" : ""
            } flex flex-col gap-20 p-5`}
          >
            <RouterProvider router={router} />
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
        </PostContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
