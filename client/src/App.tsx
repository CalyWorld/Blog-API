import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./component/header/navPage";
import PostPage from "./component/pages/postPage";
import { Post, PostsContext } from "./context/postContext";
import { User, UserContext } from "./context/userContext";
import SignInForm from "./form/signInForm";
import SignUpForm from "./form/signUpForm";
import { useState, useMemo } from "react";
import ErrorPage from "./component/pages/errorPage";
import PostDetail from "./component/pages/postDetail";
import { CommentModal } from "./component/pages/commentModal";
import { PostContext } from "./context/postDetailContext";
import { PostComments, PostCommentsContext } from "./context/commentContext";

function App() {
  const [user, setUser] = useState<User | null>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<PostComments[]>([]);
  const [openSignInForm, setSignInForm] = useState<boolean>(false);
  const [openSignUpForm, setSignUpForm] = useState<boolean>(false);
  const [openCommentModal, setCommentModal] = useState<boolean>(false);

  // Use useMemo to memoize the context value
  const userContextValue = useMemo(() => ({ user, setUser }), [user]);
  const postsContextValue = useMemo(() => ({ posts, setPosts }), [posts]);
  const postContextValue = useMemo(() => ({ post, setPost }), [post, setPost]);
  const postCommentsContextValue = useMemo(
    () => ({ postComments, setPostComments }),
    [postComments, setPostComments],
  );
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Nav setSignInForm={setSignInForm} setSignUpForm={setSignUpForm} />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <PostPage />,
        },
        {
          path: "post/:postId",
          element: <PostDetail setCommentModal={setCommentModal} />,
        },
      ],
    },
  ]);

  return (
    <UserContext.Provider value={userContextValue}>
      <PostsContext.Provider value={postsContextValue}>
        <PostContext.Provider value={postContextValue}>
          <PostCommentsContext.Provider value={postCommentsContextValue}>
            <div
              className={`app-container ${
                openSignInForm || openSignUpForm || openCommentModal
                  ? "blur-sm"
                  : ""
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
            {openCommentModal && (
              <CommentModal setCommentModal={setCommentModal} />
            )}
          </PostCommentsContext.Provider>
        </PostContext.Provider>
      </PostsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
