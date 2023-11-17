import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const postSchema = z.object({
  title: z.string().min(4, { message: "Title is required" }),
  content: z.string().min(4, { message: "Content is required" }),
  imageUrl: z.union([z.string().url().nullish(), z.literal("")]),
});
type postSchemaType = z.infer<typeof postSchema>;

export default function CreatePostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postSchemaType>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit: SubmitHandler<postSchemaType> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log("submitted post succesfully");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <textarea
        placeholder="Title"
        style={{ background: "rgb(235,231,231)" }}
        className="p-3 border-l border-gray-400 text-3xl"
        id="title"
        {...register("title")}
      ></textarea>
      <textarea
        placeholder="Tell your Story"
        style={{ background: "rgb(235,231,231)" }}
        className="p-3 text-xl"
        id="content"
        {...register("content")}
      ></textarea>
      <input
        placeholder="Enter Image Url, Not Compulsory Though"
        className="p-3 text-xl"
        style={{ background: "rgb(235,231,231)" }}
        id="image-url"
        {...register("imageUrl")}
      ></input>
      <div className="button-container flex justify-center">
        <button
          type="submit"
          className={`bg-green-700 text-white px-2 py-1 rounded ${
            Boolean(errors.content) ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={Boolean(errors.content)}
        >
          Publish
        </button>
      </div>
    </form>
  );
}
