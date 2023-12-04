import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Posts } from "../context/postsContext";
import { useNavigate } from "react-router-dom";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import { useContext } from "react";
import { UserContext, UserContextType } from "../context/userContext";
interface UtlityPageProp {
  post: Posts;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveLink?: React.Dispatch<React.SetStateAction<string>>;
}

export default function UtilityPage({
  post,
  setEditForm,
  setActiveLink,
}: UtlityPageProp) {
  const API_BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();
  const { user } = useContext<UserContextType>(UserContext);

  async function handleUpdatePostPublicationStatus(publicationStatus: string) {
    let isPublished;

    if (publicationStatus === "published") {
      isPublished = true;
    } else if (publicationStatus === "unpublished") {
      isPublished = false;
    }

    const postDetail = {
      title: post.title,
      content: post.content,
      author: post.author,
      publishedDate: post.publishedDate,
      isPublished: isPublished,
      imageUrl: post.imageUrl,
      _id: post._id,
    };

    try {
      await fetch(`${API_BASE_URL}/posts/${post._id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postDetail),
      });
      if (setActiveLink) {
        setActiveLink(publicationStatus);
      }
      navigate(`/user/${user?._id}/${publicationStatus}`);
    } catch (error) {
      console.log(`Error while trying to ${publicationStatus}`, error);
    }
  }

  async function handleDeletePost() {
    try {
      await fetch(`${API_BASE_URL}/posts/${post._id}/delete`, {
        method: "DELETE",
      });
      navigate(`/user/${user?._id}`);
    } catch (error) {
      console.log("Handle delete error", error);
    }
  }
  return (
    <div className="utility-modal absolute flex flex-col gap-5 mt-2 w-48">
      <div
        className="flex items-center gap-2"
        onClick={() => {
          handleDeletePost();
        }}
      >
        <AiOutlineDelete size={18} />
        <p>Delete Post</p>
      </div>
      <div
        className="flex items-center gap-2"
        onClick={() => {
          setEditForm(true);
        }}
      >
        <CiEdit size={18} />
        <p>Edit Post</p>
      </div>
      <div
        className="flex items-center gap-2"
        onClick={() => {
          handleUpdatePostPublicationStatus(
            post.isPublished ? "unpublished" : "published",
          );
        }}
      >
        {post.isPublished ? (
          <MdOutlineUnpublished size={18} />
        ) : (
          <MdOutlinePublishedWithChanges size={18} />
        )}
        <p>{post.isPublished ? "Unpublish Post" : "Publish Post"}</p>
      </div>
    </div>
  );
}
