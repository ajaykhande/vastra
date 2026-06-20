import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Spinners from "../components/Spinners";

const PrivateRoute = () => {
  const { isLoggedIn, authChecked } = useSelector((store) => store.auth);

  if (!authChecked) {
    return (
      <div>
        <Spinners />
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
