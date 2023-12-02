import AuthProps from "../interface/AuthProps";
import openSignUpModal from "../helper/openSignUpModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdClose } from "react-icons/io";
import * as z from "zod";
import { useContext } from "react";
import { UserContext, UserContextType } from "../context/userContext";
import Cookies from "js-cookie";

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "username is required" })
    .refine((data) => data.includes("@"), {
      message: "username must contain the '@' symbol",
    }),
  password: z
    .string()
    .min(4, { message: "password must be at least 4 characters" }),
});

type signInSchemaType = z.infer<typeof formSchema>;

function SignInForm({ setSignInForm, setSignUpForm }: AuthProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const { setUser } = useContext<UserContextType>(UserContext);

  const onSubmit: SubmitHandler<signInSchemaType> = async (data) => {
    try {
      const user = { username: data.username, password: data.password };
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Sign-in successful");
        const user = await response.json();
        Cookies.set(
          "userInfo",
          JSON.stringify({
            username: user.username,
            password: user.password,
            _id: user._id,
          }),
          { expires: 29 },
        );
        setUser({
          username: user?.username,
          password: user?.password,
          _id: user?._id,
        });
        setSignInForm(false);
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.log("Error occurred during sign-in:", error);
    }
  };

  return (
    <div className="form-card">
      <form
        className="flex flex-col gap-5 max-w-lg mx-auto p-5 pb-8 bg-white rounded shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="close-form flex justify-between items-center p-2">
          <h1 className="text-2xl font-semibold">Sign In</h1>
          <button onClick={() => setSignInForm(false)}>
            <IoMdClose />
          </button>
        </div>

        <div className="input-form">
          <div className="mb-1 gap-5 flex items-center">
            <label className="w-2/4 px-2 py-1 text-bold font-medium text-gray-700">
              Username:
            </label>
            <input
              className={`w-3/4 px-2 py-1 bg-white border rounded-md focus:outline-none focus:border-blue-500 ${
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

        <div className="mb-4">
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            type="submit"
          >
            Sign In
          </button>
        </div>

        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <button
              className="text-blue-500"
              onClick={() => {
                openSignUpModal({ setSignInForm, setSignUpForm });
              }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
