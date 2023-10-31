import {
  useNavigate,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-14">
        <h1>Something went wrong 😢</h1>
        <p>{error.data}</p>
        <div className="error-back-button">
          <button onClick={() => navigate(-1)}>&larr; Go back</button>
        </div>
      </div>
    </div>
  );
}
