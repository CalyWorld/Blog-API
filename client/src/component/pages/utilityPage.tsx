import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Posts } from "../../context/postsContext";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
interface UtlityPageProp {
  post: Posts;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UtilityPage({ post, setEditForm }: UtlityPageProp) {
  async function handleUpdatePostPublicationStatus(publicationStatus: string) {
    let isPublished;
    if (publicationStatus === "publish") {
      isPublished = true;
    } else if (publicationStatus === "unPublish") {
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
      const response = await fetch(
        `http://localhost:3000/posts/${post._id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postDetail),
        },
      );
      if (response.ok) {
        console.log("post succesfully deleted");
      }
    } catch (error) {
      console.log(`Error while trying to ${publicationStatus}`, error);
    }
  }
  async function handleDeletePost() {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/${post._id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        console.log("post publish status succesfully changed");
      }
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
            post.isPublished ? "unPublish" : "publish",
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
