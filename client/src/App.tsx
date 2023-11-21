import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./component/header/navPage";
import PostPage from "./component/pages/PostPage.1";
import { Posts, PostsContext } from "./context/postsContext";
import { User, UserContext, UserPostContext } from "./context/userContext";
import SignInForm from "./form/signInForm";
import SignUpForm from "./form/signUpForm";
import { useState, useMemo } from "react";
import ErrorPage from "./component/pages/errorPage";
import PostDetail from "./component/pages/postDetail";
import { PostContext, Post } from "./context/postContext";
import CreatePostPage from "./component/pages/createPostPage";
import ProfilePage from "./component/pages/profilepage";
import PublishedPostPage from "./component/pages/publishedPostPage";
import UnPublishedPostPage from "./component/pages/unpublishedPostPage";
import UserPostDetail from "./component/pages/userPostDetail";

function App() {
  const [user, setUser] = useState<User | null>({});
  const [posts, setPosts] = useState<Posts[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [userPosts, setUserPost] = useState<Posts[]>([]);
  const [openSignInForm, setSignInForm] = useState<boolean>(false);
  const [openSignUpForm, setSignUpForm] = useState<boolean>(false);
  const [openCommentModal, setCommentModal] = useState<boolean>(false);

  // Use useMemo to memoize the context value
  const userContextValue = useMemo(() => ({ user, setUser }), [user]);
  const postsContextValue = useMemo(() => ({ posts, setPosts }), [posts]);
  const postContextValue = useMemo(() => ({ post, setPost }), [post, setPost]);
  const userPostContextValue = useMemo(
    () => ({ userPosts, setUserPost }),
    [userPosts],
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
          path: "/new-story",
          element: <CreatePostPage />,
        },
        {
          path: "post/:postId",
          element: (
            <PostDetail
              openCommentModal={openCommentModal}
              setCommentModal={setCommentModal}
            />
          ),
        },
        {
          path: `/@username/*`,
          element: (
            <ProfilePage
              openCommentModal={openCommentModal}
              setCommentModal={setCommentModal}
            />
          ),
          children: [
            {
              path: "published",
              element: <PublishedPostPage />,
            },
            {
              path: "unpublished",
              element: <UnPublishedPostPage />,
            },
            {
              path: "published/:postId",
              element: (
                <UserPostDetail
                  openCommentModal={openCommentModal}
                  setCommentModal={setCommentModal}
                />
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <UserContext.Provider value={userContextValue}>
      <PostsContext.Provider value={postsContextValue}>
        <PostContext.Provider value={postContextValue}>
          <UserPostContext.Provider value={userPostContextValue}>
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
          </UserPostContext.Provider>
        </PostContext.Provider>
      </PostsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
