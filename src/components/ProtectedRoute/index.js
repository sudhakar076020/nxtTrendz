import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
  //children is the props
  const token = Cookies.get("jwt_token"); // or however you store it
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
