import { Link } from "react-router-dom";

export default function SendToErrorLink() {
  return (
    <Link to="/public">
      <h1 style={{ color: "white" }}>404 Not Found</h1>
    </Link>
  );
}
