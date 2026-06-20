import { AiFillProduct } from "react-icons/ai";
import { IoPersonSharp } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../css/admin.css";
import "../css/profile.css";
import { authActions } from "../store/authSlice";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div
          className={`menu-item ${
            location.pathname === "/admin" ||
            location.pathname.startsWith("/admin/all-product")
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/admin/all-product")}
        >
          <AiFillProduct /> All Products
        </div>

        <div
          className={`menu-item ${
            location.pathname === "/admin/add-product" ? "active" : ""
          }`}
          onClick={() => navigate("/admin/add-product")}
        >
          <MdAddBox /> Add Product
        </div>

        <div
          className={`menu-item ${
            location.pathname === "/admin/profile" ? "active" : ""
          }`}
          onClick={() => navigate("/admin/profile")}
        >
          <IoPersonSharp /> Profile
        </div>

        <button className="logout-btn menu-item" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
