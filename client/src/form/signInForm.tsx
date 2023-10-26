import { useState, ChangeEvent } from "react";
import NavProps from "../interface/navProps";
import openSignUpModal from "../helper/openSignUpModal";

function SignInForm({ setSignInForm, setSignUpForm }: NavProps) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  if (!setSignInForm) {
    return null;
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log({ user: response });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="form-card">
      <form
        className="flex flex-col gap-5 max-w-md mx-auto p-5 pb-8 bg-white rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="close-form flex justify-between items-center p-2">
          <h1 className="text-2xl font-semibold">Sign In</h1>
          <button onClick={() => setSignInForm(false)}>X</button>
        </div>

        <div className="mb-4 gap-5 flex items-center">
          <label
            htmlFor="username"
            className="w-1/4 px-2 py-1 text-bold font-medium text-gray-700"
          >
            username:
          </label>
          <input
            id="username"
            onChange={handleInputChange}
            className="w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            value={user.username}
          />
        </div>

        <div className="mb-4 gap-5 flex items-center">
          <label
            htmlFor="password"
            className="w-1/4 px-2 py-1 text-bold font-medium text-gray-700"
          >
            password:
          </label>
          <input
            id="password"
            onChange={handleInputChange}
            className="w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={user.password}
          />
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
