import NavProps from "../interface/navProps";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import openSignInModal from "../helper/openSignInModal";
import * as z from "zod";

const formSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "username is required" })
      .refine((data) => data.includes("@"), {
        message: "username must contain the '@' symbol",
      }),
    password: z
      .string()
      .min(4, { message: "password must be at least 4 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwords don't match",
  });

type signUpSchemaType = z.infer<typeof formSchema>;

function SignUpForm({ setSignInForm, setSignUpForm }: NavProps) {
  if (!setSignUpForm) {
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<signUpSchemaType> = (data) => console.log(data);

  return (
    <div className="form-card">
      <form
        className="flex flex-col gap-5 max-w-3xl mx-auto p-5 pb-8 bg-white rounded shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="close-form flex justify-between items-center p-2">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <button onClick={() => setSignUpForm(false)}>X</button>
        </div>

        <div className="input-form">
          <div className="mb-1 gap-5 flex items-center">
            <label className="w-2/4 px-2 py-1 text-bold font-medium text-gray-700">
              Username:
            </label>
            <input
              className={`w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
                errors.username ? "border-red-500" : ""
              }`}
              id="username"
              type="text"
              placeholder="Enter Username"
              {...register("username")}
            />
          </div>
          {errors.username && (
            <p className="px-2 py-1 text-sm italic text-red-500 mb-4">
              {errors.username?.message}
            </p>
          )}
        </div>

        <div className="input form">
          <div className="mb-1 gap-5 flex items-center">
            <label className="w-2/4 px-2 py-1 text-bold font-medium text-gray-700">
              Password:
            </label>
            <input
              className={`w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
                errors.password ? "border-red-500" : ""
              }`}
              id="password"
              type="text"
              placeholder="Enter Password"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="px-2 py-1 text-sm italic text-red-500 mb-4">
              {errors.password?.message}
            </p>
          )}
        </div>

        <div className="input form">
          <div className="mb-1 gap-5 flex items-center">
            <label className="w-2/4 px-2 py-1 text-bold font-medium text-gray-700">
              Confirm password:
            </label>
            <input
              className={`w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              id="confirmPassword"
              type="text"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="px-2 py-1 text-sm italic text-red-500 mb-4">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <p>
            Already have an account?{" "}
            <button
              className="text-blue-500"
              onClick={() => {
                openSignInModal({ setSignInForm, setSignUpForm });
              }}
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
