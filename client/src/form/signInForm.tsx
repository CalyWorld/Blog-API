import { useState, ChangeEvent } from "react";
import NavProps from "../interface/navProps";
import { redirect } from "react-router-dom";
function SignInForm({ setSignInForm, setSignUpForm }: NavProps) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  if (!setSignInForm) {
    return null;
  }
  function openSignUpModal() {
    if (!setSignInForm) {
      return null;
    }
    setSignInForm(false);
    if (!setSignUpForm) {
      return null;
    }
    setSignUpForm(true);
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
      if (response.ok) {
        redirect("http://localhost:3000");
      } else {
        console.log("sign-in again");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="form-card">
      <div className="close-form flex justify-end p-5">
        <button onClick={() => setSignInForm(false)}>X</button>
      </div>
      <form
        className="flex flex-col gap-5 max-w-md mx-auto p-5 pb-8 bg-white rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-5 text-center">Sign In</h1>

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
                openSignUpModal();
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
