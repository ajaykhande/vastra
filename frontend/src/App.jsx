import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./api/productApi";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { productActions } from "./store/productSlice";
import { useEffect } from "react";
import { Outlet } from "react-router";
import Home from "./routes/Home";
import Spinners from "./components/Spinners";
import { authActions } from "./store/authSlice";
import Login from "./routes/Login";
import { getProfile, login } from "./api/authApi";
import { getWishlist } from "./api/wishlistApi";
import { wishlistActions } from "./store/wishlistSlice";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";
import { getAddress } from "./api/addressApi";
import { bagActions } from "./store/bagSlice";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.products.loading);

  useEffect(() => {
    const refreshLogin = async () => {
      const bagItem = JSON.parse(localStorage.getItem("bag"));
      if (bagItem) {
        dispatch(bagActions.setBagItem(bagItem));
      }
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }
      try {
        const addressRes = await getAddress();
        dispatch(authActions.setAddress(addressRes));
      } catch (err) {}

      try {
        const wishlistRes = await getWishlist();
        dispatch(wishlistActions.setWishlist(wishlistRes));
      } catch (err) {}
    };
    refreshLogin();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>{loading ? <Spinners /> : <Outlet />}</main>
      <Footer />
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
    </>
  );
}

export default App;
