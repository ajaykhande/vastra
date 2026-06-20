import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminFooter from "../admin-components/AdminFooter";
import AdminHeader from "../admin-components/AdminHeader";
import Spinners from "../components/Spinners";
import { authActions } from "../store/authSlice";
import { productActions } from "../store/productSlice";
import { useEffect } from "react";
import { getProfile } from "../api/authApi";
import { getProducts } from "../api/productApi";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.products.loading);

  return (
    <div className="admin-wrapper">
      <AdminHeader />
      <main>{loading ? <Spinners /> : <Outlet />}</main>
      <AdminFooter />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        theme="dark"
        transition={Bounce}
        style={{ marginTop: "50px" }}
        hideProgressBar
        closeButton={false}
        pauseOnHover={false}
        draggable={false}
      />
    </div>
  );
};

export default AdminLayout;
