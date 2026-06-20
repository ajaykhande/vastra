import Home from "./routes/Home";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ProductDetail from "./routes/ProductDetail";
import Bag from "./routes/Bag";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./routes/Profile";
import ProfileLayout from "./routes/ProfileLayout";
import Checkout from "./routes/Checkout";
import OrderSuccess from "./routes/OrderSuccess";
import Order from "./routes/Orders";
import Address from "./components/Address";
import Wallet from "./routes/wallet";
import Wishlist from "./routes/Wishlist";
import AdminRoute from "./admin-routes/AdminRoute";
import AdminLayout from "./admin-routes/AdminLayout";
import AdminDashboard from "./admin-routes/AdminDashboard";
import AllProduct from "./admin-routes/AllProduct";
import EditProduct from "./admin-routes/EditProduct";
import AddProduct from "./admin-routes/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/bag", element: <Bag /> },

      {
        element: <PrivateRoute />,
        children: [
          {
            path: "profile",
            element: <ProfileLayout />,
            children: [
              { index: true, element: <Profile /> },
              { path: "orders", element: <Order /> },
              { path: "address", element: <Address /> },
              { path: "wallet", element: <Wallet /> },
            ],
          },

          { path: "/checkout", element: <Checkout /> },
          { path: "/order-placed", element: <OrderSuccess /> },
          { path: "/wishlist", element: <Wishlist /> },
        ],
      },
    ],
  },

  {
    element: <AdminRoute />,
    children: [
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            element: <AdminDashboard />,
            children: [
              { index: true, element: <AllProduct /> },
              { path: "all-product", element: <AllProduct /> },
              { path: "profile", element: <Profile /> },
              { path: "edit-product/:id", element: <EditProduct /> },
              { path: "add-product", element: <AddProduct /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
