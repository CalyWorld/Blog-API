import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./component/header/navPage";
import PostPage from "./component/pages/postPage";
import { Post, PostContext } from "./context/postContext";
import { User, UserContext } from "./context/userContext";
import SignInForm from "./form/signInForm";
import SignUpForm from "./form/signUpForm";
import { useState, useMemo, useEffect } from "react";
import ErrorPage from "./component/pages/errorPage";
import PostDetail from "./component/pages/postDetail";

function App() {
  const [user, setUser] = useState<User | null>({});
  const [posts, setPost] = useState<Post[]>([]);
  const [openSignInForm, setSignInForm] = useState<boolean>(false);
  const [openSignUpForm, setSignUpForm] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (response.ok) {
          const posts = await response.json();
          console.log(posts);
          setPost(posts);
        } else {
          console.log("Failed to fetch posts");
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, []);

  // Use useMemo to memoize the context value
  const userContextValue = useMemo(() => ({ user, setUser }), [user]);
  const postContextValue = useMemo(() => ({ posts, setPost }), [posts]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Nav setSignInForm={setSignInForm} setSignUpForm={setSignUpForm} />
        </>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <PostPage />,
        },
        {
          path: "post/:postId",
          element: <PostDetail />,
        },
      ],
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
