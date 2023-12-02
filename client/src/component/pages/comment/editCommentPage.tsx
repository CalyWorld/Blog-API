import { FaRegUser } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formatUsername } from "../../../helper/format";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../../../context/userContext";
import { Comments } from "../../../interface/commentsProps";

interface EditCommentPage {
  setEditCommentModal: React.Dispatch<React.SetStateAction<string>>;
  comment: Comments;
}

const textAreaSchema = z.object({
  content: z.string().min(4, { message: "Content is required" }),
});

type editCommentContentSchemaType = z.infer<typeof textAreaSchema>;

export default function EditCommentPage({
  setEditCommentModal,
  comment,
}: EditCommentPage) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editCommentContentSchemaType>({
    resolver: zodResolver(textAreaSchema),
  });
  const { user } = useContext<UserContextType>(UserContext);
  const [commentEdit, setEdit] = useState({
    content: comment.content ?? "",
  });
  const API_BASE_URL = "http://localhost:3000";

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setEdit({ ...commentEdit, [e.target.name]: e.target.value });
  }

  const onSubmit: SubmitHandler<editCommentContentSchemaType> = async (
    data,
  ) => {
    try {
      const commentDetails = {
        content: data.content,
        author: user?._id,
        post: comment._id,
        commentDate: Date.now(),
      };
      await fetch(`${API_BASE_URL}/comments/${comment._id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentDetails),
      });
      setEditCommentModal("");
    } catch (error) {
      console.log("Error occured during submitting comments", error);
    }
  };
  return (
    <div className="shadow-lg rounded-md h-52 flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        <div className="comment-profile flex gap-2">
          <FaRegUser size={24} />
          <p>{formatUsername(user?.username)}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            placeholder="What are your thoughts"
            className={`px-2 py-1 border rounded-md w-full h-full`}
            style={{ background: "rgb(235,231,231)" }}
            id="content"
            {...register("content")}
            value={commentEdit.content}
            onChange={(e) => {
              handleChange(e);
            }}
          ></textarea>
          <div className="comment-buttons flex justify-end p-1">
            <div className="flex items-center gap-3">
              <p
                className="cursor-pointer"
                onClick={() => {
                  setEditCommentModal("");
                }}
              >
                Cancel
              </p>
              <button
                type="submit"
                className={`bg-green-700 text-white px-2 py-1 rounded ${
                  Boolean(errors.content)
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-green-700 text-white px-2 py-1 rounded"
                }`}
                disabled={Boolean(errors.content)}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
