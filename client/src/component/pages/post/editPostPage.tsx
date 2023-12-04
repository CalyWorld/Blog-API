import { Posts } from "../../../context/postsContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

interface EditPostPage {
  post: Posts | null;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveLink?: React.Dispatch<React.SetStateAction<string>>;
}
const editPostSchema = z.object({
  title: z.string().min(4, { message: "Title is required" }),
  content: z.string().min(4, { message: "Content is required" }),
  imageUrl: z.union([z.string().url().nullish(), z.literal("")]),
  isPublished: z.boolean(),
});
type editPostSchemaType = z.infer<typeof editPostSchema>;

export default function EditPostPage({
  post,
  setEditForm,
  setActiveLink,
}: EditPostPage) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editPostSchemaType>({
    resolver: zodResolver(editPostSchema),
  });
  const API_BASE_URL = "http://localhost:3000";
  const { user } = useContext<UserContextType>(UserContext);
  const navigate = useNavigate();
  const [editPost, setEditPost] = useState({
    title: post?.title ?? "",
    content: post?.content ?? "",
    author: user?._id,
    publishedDate: Date.now(),
    isPublished: post?.isPublished,
    imageUrl: post?.imageUrl ?? "",
  });

  if (!setActiveLink) {
    return undefined;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;

    setEditPost((prevEditPost) => ({
      ...prevEditPost,
      [target.name]:
        target.type === "checkbox"
          ? (target as HTMLInputElement).checked
          : target.value,
    }));
  }

  const onSubmit: SubmitHandler<editPostSchemaType> = async (data) => {
    try {
      await fetch(`${API_BASE_URL}/posts/${post?._id}/update`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEditForm(false);
      navigate(
        `/user/${user?._id}/${data.isPublished ? "published" : "unpublished"}`,
      );
      setActiveLink(`${data.isPublished ? "published" : "unpublished"}`);
    } catch (error) {
      console.log("Handle edit post error", error);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        placeholder="Title"
        style={{ background: "rgb(235,231,231)" }}
        className="p-3 border-l border-gray-400 text-3xl"
        id="title"
        {...register("title")}
        value={editPost.title}
        onChange={(e) => {
          handleChange(e);
        }}
      ></textarea>
      <textarea
        placeholder="Tell your Story"
        style={{ background: "rgb(235,231,231)" }}
        className="p-3 text-xl"
        id="content"
        {...register("content")}
        value={editPost.content}
        onChange={(e) => {
          handleChange(e);
        }}
      ></textarea>
      <input
        placeholder="http://www.imageUrl.com"
        className="p-3 text-xl"
        style={{ background: "rgb(235,231,231)" }}
        id="imageUrl"
        {...register("imageUrl")}
        value={editPost.imageUrl}
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
      <div className="flex items-center gap-2 p-3">
        <input
          type="checkbox"
          id="isPublished"
          className="bg-white"
          {...register("isPublished")}
          checked={editPost.isPublished}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <label className="text-xl" htmlFor="publish-post-checkbox">
          Publish Post
        </label>
      </div>
      <div className="button-container flex justify-center p-3 gap-3">
        <button
          className="bg-green-700 text-white px-2 py-1 rounded cursor-pointer"
          onClick={() => {
            setEditForm(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`bg-green-700 text-white px-2 py-1 rounded cursor-pointer ${
            Boolean(errors.content) ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={Boolean(errors.content)}
        >
          Edit Post
        </button>
      </div>
    </form>
  );
}
