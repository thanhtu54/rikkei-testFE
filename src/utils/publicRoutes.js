import { Navigate } from "react-router-dom";
import Login from "../components/login";

const PublicRoutes = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  } else {
    return <Login />;
  }
};

export default PublicRoutes;
