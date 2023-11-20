import { AiOutlineDelete } from "react-icons/ai";

interface UtilityPage {
  id: string;
}
export default function UtilityPage({ id }: UtilityPage) {
  const handleDeletePost = async () => {
    try {
      await fetch(`http://localhost:3000/posts/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Handle delete error", error);
    }
  };
  return (
    <div className="utility-modal absolute flex flex-col gap-5 mt-2">
      <div
        onClick={() => {
          handleDeletePost();
        }}
      >
        <AiOutlineDelete size={18} />
      </div>
      <div>delete Post</div>
      <div>unpublish Post</div>
    </div>
  );
}
