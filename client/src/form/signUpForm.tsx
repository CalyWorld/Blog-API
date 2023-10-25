import NavProps from "../interface/navProps";
function SignUpForm({ setSignUpForm }: NavProps) {
  if (!setSignUpForm) {
    return null;
  }

  return (
    <div className="form-card">
      <div className="close-form flex justify-end p-5">
        <button onClick={() => setSignUpForm(false)}>X</button>
      </div>
      <form
        className="flex flex-col gap-5 max-w-md mx-auto p-5 pb-8 bg-white rounded shadow-lg"
        // onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-5 text-center">Sign Up</h1>

        <div className="mb-4 gap-5 flex items-center">
          <label
            htmlFor="username"
            className="w-1/4 px-2 py-1 text-bold font-medium text-gray-700"
          >
            username:
          </label>
          <input
            id="username"
            // onChange={handleInputChange}
            className="w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            // value={user.username}
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
            // onChange={handleInputChange}
            className="w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            // value={user.password}
          />
        </div>
        <div className="mb-4 gap-5 flex items-center">
          <label
            htmlFor="confirmPassword"
            className="w-1/4 px-2 py-1 text-bold font-medium text-gray-700"
          >
            Confirm Password:
          </label>
          <input
            id="confirmPassword"
            // onChange={handleInputChange}
            className="w-3/4 px-2 py-1 bg-white border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            // value={user.confirmPassword}
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
            Already have an account?{" "}
            <a href="" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
