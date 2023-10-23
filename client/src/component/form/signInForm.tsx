import { NavProps } from "../pages/navPage";
function SignInForm({ setModal }: NavProps) {
  return (
    <div className="form-card">
      <div className="close-form flex justify-end p-5">
        <button onClick={() => setModal(false)}>X</button>
      </div>
      <form className="flex flex-col gap-5 items-center p-5">
        <h1>Sign In</h1>
        <div className="form-group">
          <label htmlFor="username">username: </label>
          <input
            id="username"
            className="form-control"
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            value=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">password: </label>
          <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value=""
          />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <p>
            Don't have an account? <a href="/user/signup">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
