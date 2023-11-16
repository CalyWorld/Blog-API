import { useContext } from "react";
import { FaRegUser } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserContext, UserContextType } from "../../context/userContext";
import { formatUsername } from "../../helper/format";
import { PostContext, PostContextType } from "../../context/postDetailContext";
interface CreateCommentModal {
  setCreateCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const textAreaSchema = z.object({
  content: z.string().min(4, { message: "Content is required" }),
});

type commentConentSchemaType = z.infer<typeof textAreaSchema>;

export default function CreateCommentModal({
  setCreateCommentModal,
}: CreateCommentModal) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<commentConentSchemaType>({
    resolver: zodResolver(textAreaSchema),
  });

  const { user } = useContext<UserContextType>(UserContext);
  const { post } = useContext<PostContextType>(PostContext);

  const onSubmit: SubmitHandler<commentConentSchemaType> = async (data) => {
    try {
      const commentDetails = {
        content: data.content,
        author: user?._id,
        post: post?._id,
        commentDate: Date.now(),
      };
      const response = await fetch("http://localhost:3000/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentDetails),
      });
      if (response.ok) {
        console.log("submitted comments successfully");
        setCreateCommentModal(false);
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
      }
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
          ></textarea>
          <div className="comment-buttons flex justify-end p-1">
            <div className="flex items-center gap-3">
              <p
                className="cursor-pointer"
                onClick={() => {
                  setCreateCommentModal(false);
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
                Respond
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
