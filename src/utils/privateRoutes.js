import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/layouts/header";
import Navbar from "../components/layouts/navbar";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return (
      <div className="wrapper">
        <Header />
        <div className="wrapper-content">
          <Navbar />
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoutes;
