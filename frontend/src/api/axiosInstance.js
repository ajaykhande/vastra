import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong";
    const data = error.response?.data;

    if (data?.message) {
     
      if (data.message === "Address not found") {
        return Promise.reject(error);
      }
      message = data.message;
    } else if (typeof data === "object") {
      message = Object.values(data)[0];
    }

    toast.error(message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
