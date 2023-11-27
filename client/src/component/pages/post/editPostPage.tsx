import { Post } from "../../../context/postContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../../../context/userContext";

interface EditPostPage {
  post: Post | null;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const editPostSchema = z.object({
  title: z.string().min(4, { message: "Title is required" }),
  content: z.string().min(4, { message: "Content is required" }),
  imageUrl: z.union([z.string().url().nullish(), z.literal("")]),
  isPublished: z.boolean(),
});
type editPostSchemaType = z.infer<typeof editPostSchema>;

export default function EditPostPage({ post, setEditForm }: EditPostPage) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editPostSchemaType>({
    resolver: zodResolver(editPostSchema),
  });
  const { user } = useContext<UserContextType>(UserContext);

  const [editPost, setEditPost] = useState({
    title: post?.post.title ?? "",
    content: post?.post.content ?? "",
    author: user?._id,
    publishedDate: Date.now(),
    isPublished: post?.post.isPublished ?? false,
    imageUrl: post?.post.imageUrl ?? "",
  });

  function handleChange(
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
    console.log(editPost);
  }

  const onSubmit: SubmitHandler<editPostSchemaType> = async (data) => {
    console.log(data);
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
        placeholder="Enter Image Url, Not Compulsory Though"
        className="p-3 text-xl"
        style={{ background: "rgb(235,231,231)" }}
        id="image-url"
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
          //   checked={editPost.isPublished}
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
