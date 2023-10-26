import NavProps from "../interface/navProps";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import openSignInModal from "../helper/openSignInModal";
import * as z from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .refine((value) => !value.includes("@"), {
      message: "Username must contain '@' symbol",
    }),
  password: z.string().min(4, "Password must be at least 4 characters long"),
  // confirmPassword: z.string().refine(
  //   (values: string, data: { password: string }) => {
  //     // Now TypeScript knows the types of values and data
  //     return values === data.password;
  //   },
  //   {
  //     message: "Passwords do not match",
  //     path: ["confirmPassword"],
  //   },
  // ),
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
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 max-w-3xl mx-auto p-5 pb-8 bg-white rounded shadow-lg"
        // onSubmit={handleSubmit}
      >
        <div className="close-form flex justify-between items-center p-2">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <button onClick={() => setSignUpForm(false)}>X</button>
        </div>
        <div className="mb-4 gap-5 flex items-center">
          <label
            htmlFor="username"
            className="w-1/4 px-2 py-1 text-bold font-medium text-gray-700"
          >
            username:
          </label>
          <input
            {...register("username")}
            id="username"
            // onChange={handleInputChange}
            className="w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            // value={user.username}
          />
          {errors.username?.message && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>

        <div className="mb-4 gap-5 flex items-center">
          <label
            htmlFor="password"
            className="w-1/4 px-2 py-1 text-bold font-medium text-gray-700"
          >
            password:
          </label>
          <input
            {...register("password")}
            id="password"
            // onChange={handleInputChange}
            className="w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            // value={user.password}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </div>

        <div className="mb-4 gap-5 flex items-center">
          <label
            htmlFor="password"
            className="w-1/4 px-2 py-1 text-bold font-medium text-gray-700"
          >
            Confirm password:
          </label>
          <input
            // {...register("confirmPassword")}
            id="confirmpassword"
            // onChange={handleInputChange}
            className="w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            type="password"
            name="confirmpassword"
            placeholder="Enter your password"
            required
            // value={user.password}
          />
          {/* {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )} */}
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
