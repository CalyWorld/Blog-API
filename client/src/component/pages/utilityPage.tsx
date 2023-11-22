import { AiOutlineDelete } from "react-icons/ai";
import { Post } from "../../context/postContext";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
interface UtlityPageProp {
  post: Post;
}

export default function UtilityPage({ post }: UtlityPageProp) {
  async function handleUpdatePostPublicationStatus(publicationStatus: string) {
    let isPublished;
    if (publicationStatus === "publish") {
      isPublished = true;
    } else if (publicationStatus === "unPublish") {
      isPublished = false;
    }

    const postDetail = {
      title: post.post.title,
      content: post.post.content,
      author: post.post.author,
      publishedDate: post.post.publishedDate,
      isPublished: isPublished,
      imageUrl: post.post.imageUrl,
      _id: post.post._id,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/posts/${post.post._id}/update`,
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
        `http://localhost:3000/posts/${post.post._id}/delete`,
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
        <p>Delete</p>
      </div>
      <div>edit Post</div>
      <div
        className="flex items-center gap-2"
        onClick={() => {
          handleUpdatePostPublicationStatus(
            post.post.isPublished ? "unPublish" : "publish",
          );
        }}
      >
        {post.post.isPublished ? (
          <MdOutlineUnpublished size={18} />
        ) : (
          <MdOutlinePublishedWithChanges size={18} />
        )}
        <p>{post.post.isPublished ? "Unpublish Post" : "Publish Post"}</p>
      </div>
    </div>
  );
}
