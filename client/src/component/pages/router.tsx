import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "../header/navPage";
import ErrorPage from "./errorPage";
import PostPage from "./postPage";
import CreatePostPage from "./createPostPage";
import PostDetail from "./postDetail";
import ProfilePage from "./profilepage";
import PublishedPostPage from "./publishedPostPage";
import UnPublishedPostPage from "./unpublishedPostPage";
import UserPostDetail from "./userPostDetail";
interface RouterPage {
  openCommentModal: boolean;
  setCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function RouterPage({
  openCommentModal,
  setCommentModal,
  setSignInForm,
  setSignUpForm,
}: RouterPage) {
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
          path: `/user/:userId/*`,
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
            {
              path: "Unpublished/:postId",
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
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
