import { use } from "react";
import { useSelector } from "react-redux";
import Spinners from "../components/Spinners";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user, isLoggedIn, authChecked } = useSelector((store) => store.auth);

  if (!authChecked) {
    return <Spinners />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return user?.role === "ADMIN" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
