import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import React from "react";

import "./index.css";
import store from "./store/store.js";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import AuthInitializer from "./components/AuthInitializer.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthInitializer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
