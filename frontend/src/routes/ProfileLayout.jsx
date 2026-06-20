import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  }
  
  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div
          className={`menu-item ${location.pathname === "/profile" ? "active" : ""}`}
          onClick={() => navigate("/profile")}
        >
          Profile
        </div>

        <div
          className={`menu-item ${location.pathname === "/profile/orders" ? "active" : ""}`}
          onClick={() => navigate("/profile/orders")}
        >
          Orders
        </div>

        <div
          className={`menu-item ${location.pathname === "/profile/address" ? "active" : ""}`}
          onClick={() => navigate("/profile/address")}
        >
          Address
        </div>

        <div
          className={`menu-item ${location.pathname === "/profile/wallet" ? "active" : ""}`}
          onClick={() => navigate("/profile/wallet")}
        >
          Wallet
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

export default ProfileLayout;
