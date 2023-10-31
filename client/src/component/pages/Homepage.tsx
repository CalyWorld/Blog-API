import { useContext } from "react";
import { PostContextType, PostContext } from "../../context/postContext";
import { formatDate, formatUsername, shortenWords } from "../../helper/format";
import NavProps from "../../interface/navProps";
export default function HomePage({ setSignInForm, setSignUpForm }: NavProps) {
  const { posts } = useContext<PostContextType>(PostContext);

  if (!setSignInForm) {
    return null;
  }
  if (!setSignUpForm) {
    return null;
  }

  console.log({ posts: posts });
  return (
    <>
      <div className="post-container flex flex-col gap-16">
        {posts.map((post) => (
          <a href={`/post/${post._id}`} key={post._id}>
            <div className="flex justify-between">
              <div className="left-side-bar w-48 flex flex-col justify-between gap-2">
                <p className="author-container text-xs font-bold text-gray-600">
                  {formatUsername(post.author?.username)}
                </p>
                <div className="title-container">
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                </div>
                <div className="content-container text-gray-400">
                  {shortenWords(post.content)}
                </div>
                <div className="date-container text-xs text-gray-400">
                  {formatDate(post.publishedDate)}
                </div>
              </div>
              <div className="right-side-bar w-36">
                <img src={post.imageUrl} className="h-full" alt="image-post" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
