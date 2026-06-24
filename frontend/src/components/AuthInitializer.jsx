// components/AuthInitializer.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { authActions } from "../store/authSlice";
import { productActions } from "../store/productSlice";
import { getProducts } from "../api/productApi";
import { getProfile } from "../api/authApi";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPoducts = async () => {
      dispatch(productActions.fetchProductsStart());

      const products = await getProducts();

      dispatch(productActions.fetchProductsSuccess(products));
    };
    fetchPoducts();
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(authActions.authChecked());
      return;
    }

    const refreshLogin = async () => {
      try {
        const profileRes = await getProfile(token);
        dispatch(authActions.loginSuccess(profileRes));
      } catch (err) {
        localStorage.removeItem("token");
        dispatch(authActions.logout());
        window.location.reload();
      } finally {
        dispatch(authActions.authChecked());
      }
    };
    refreshLogin();
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
